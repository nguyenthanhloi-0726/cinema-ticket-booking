import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import cinemaReducer from "./cinemaReducer";
import userReducer from "./userReducer";
import homeToolReducer from "./homeToolReducer";

const rootReducers = combineReducers({
  movieReducer,
  cinemaReducer,
  userReducer,
  homeToolReducer
});

export default rootReducers;
