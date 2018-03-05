import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import peopleReducer from './peopleReducer';

const rootReducer = combineReducers({
    people: peopleReducer,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;
