import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import peopleReducer from "./peopleReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  people: peopleReducer,
  profile: profileReducer,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
