import { combineReducers, createStore } from "redux";
import { reducer as UnderLyingReducer } from "./UnderLying/reducer";

const reducers = combineReducers({
    underlying: UnderLyingReducer
})

const store = createStore(reducers);

export default store;