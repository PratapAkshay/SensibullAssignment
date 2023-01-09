import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUderLyings } from "../../ApiServices/underlineServices";
import useWebSocket from "react-use-websocket";
import { useHistory } from "react-router-dom";
import { subscribe, unSubscribe } from "../../WebSocket";

const UnderLying = () => {

    const dispatch = useDispatch();
    const [loading, underlying, error] = useSelector(state => {
        return [state.underlying.loading, state.underlying.underLyingList, state.underlying.errorMessage]
    });
    const history = useHistory();

    const { sendJsonMessage, getWebSocket } = useWebSocket("wss://prototype.sbulltech.com/api/ws", {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => processMessages(event)
    });

    const processMessages = (event) => {
        const response = JSON.parse(event.data);
        if (response.data_type === "quote") {
            const listObj = underlying.find(val => val.token === response.payload.token);
            if (listObj) {
                listObj.price = response.payload.price;
            }
        }
    };

    useEffect(() => {
        getUderLyings(dispatch);
        let intervalset = setInterval(() => {
            unSubscribe(underlying, sendJsonMessage);
            getUderLyings(dispatch)
        }, 600000)

        return () => {
            clearInterval(intervalset);
            getWebSocket()?.close();
        }
    }, []);

    useEffect(() => {
        if (underlying.length) {
            unSubscribe(underlying, sendJsonMessage);
            subscribe(underlying, sendJsonMessage);
        }
    }, [underlying])

    const onClickHandler = (token) => {
        history.push(`/derivatives/${token}`)
    }

    return <>
        {error ? error : !loading ? underlying.map((val, index) => (
            <div key={"underLying" + index}>
                {val.underlying}: {val.price ? val.price.toFixed(2) : "Loading..."}
                <button onClick={() => onClickHandler(val.token)}>{"show derivatives ->"}</button>
            </div>
        )) :
            "loading..."
        }
    </>
}

export default UnderLying;