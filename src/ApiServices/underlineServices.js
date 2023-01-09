import { GET_UNDERLYING_SUCCESS, GET_DERIVATIVES_SUCCESS, GET_UNDERLYING_FAILURE, GET_DERIVATIVES_FAILURE } from "../redux/UnderLying/constants";

export const getUderLyings = (dispatch) => {
    fetch('https://prototype.sbulltech.com/api/underlyings').then(res => {
        return res.json();
    }).then(result => {
        if (result.success)
            dispatch({
                type: GET_UNDERLYING_SUCCESS,
                response: result.payload
            })
        else
            dispatch({
                type: GET_UNDERLYING_FAILURE,
                error: result.err_msg
            })
    }).catch(error => {
        // To be done
    })
}

export const getDerivatives = (dispatch, id) => {
    fetch('https://prototype.sbulltech.com/api/derivatives/' + id).then(res => {
        return res.json();
    }).then(result => {
        if (result.success)
            dispatch({
                type: GET_DERIVATIVES_SUCCESS,
                response: result.payload
            })
        else
            dispatch({
                type: GET_DERIVATIVES_FAILURE,
                error: result.err_msg
            })
    }).catch((error) => {
        // To be done
    })
}
