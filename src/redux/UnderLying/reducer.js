
import { GET_UNDERLYING_SUCCESS, GET_DERIVATIVES_SUCCESS, GET_DERIVATIVES_FAILURE, GET_UNDERLYING_FAILURE } from "./constants";

const initialState = {
    underLyingList: [],
    derivatives: [],
    loading: true,
    errorMessage: "",
};

export const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_UNDERLYING_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                underLyingList: actions.response
            }
        case GET_UNDERLYING_FAILURE:
            return {
                ...state,
                errorMessage: actions.error,
                underLyingList: []
            }
        case GET_DERIVATIVES_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                derivatives: actions.response
            }
        case GET_DERIVATIVES_FAILURE:
            return {
                ...state,
                errorMessage: actions.error,
                derivatives: []
            }
        default: return state;
    }
}