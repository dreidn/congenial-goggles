import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import peopleReducer from "./peopleReducer";
import profileReducer from "./profileReducer";
import starshipReducer from "./starshipReducer";

const rootReducer = combineReducers({
  people: peopleReducer,
  profile: profileReducer,
  starships: starshipReducer,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
