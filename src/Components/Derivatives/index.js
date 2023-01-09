import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getDerivatives } from "../../ApiServices/underlineServices";
import useWebSocket from "react-use-websocket";
import { subscribe, unSubscribe } from "../../WebSocket";

const Derivatives = () => {

    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [derivatives, error, loading] = useSelector(state => [state.underlying.derivatives, state.underlying.errorMessage, state.underlying.loading]);

    const { sendJsonMessage, getWebSocket } = useWebSocket("wss://prototype.sbulltech.com/api/ws", {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => {
            const response = JSON.parse(event.data);
            if (response.data_type === "quote") {
                let findObj = derivatives.find(val => val.token === response.payload.token);
                if (findObj) {
                    findObj.price = response.payload.price;
                }
            }
        }
    });

    useEffect(() => {
        if (derivatives.length) {
            unSubscribe(derivatives, sendJsonMessage);
            subscribe(derivatives, sendJsonMessage);
        }
    }, [derivatives])

    useEffect(() => {
        getDerivatives(dispatch, params.id);

        let intervalset = setInterval(() => {
            unSubscribe(derivatives, sendJsonMessage);
            getDerivatives(dispatch, params.id)
        }, 30000);

        return () => {
            clearInterval(intervalset);
            getWebSocket()?.close();
        }
    }, [])

    return <>
        <div><span className="cursorPointer" onClick={() => history.goBack()}>{"<- back"}</span></div>
        {error ? error : !loading ? derivatives.map((val, index) => (<div key={"derivative" + index}>
            {val.symbol}: {val.price ? val.price.toFixed(2) : "Loading..."}
        </div>)) : "Loading..."}
    </>
}

export default Derivatives;