import { combineReducers, createStore } from "redux";
import buildingsReducer from "./reducers/buildings";
import elevatorsReducer from "./reducers/elevators";

const rootReducer = combineReducers({
  buildings: buildingsReducer,
  elevators: elevatorsReducer
});

const store = createStore(rootReducer);

export default store;
