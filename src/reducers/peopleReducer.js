import { ERROR, LOADING, SUCCESS, NOT_STARTED } from './statusTypes';
import { PEOPLE_GET_PENDING, PEOPLE_GET_RESOLVED, PEOPLE_GET_REJECTED } from '../actions/types';

const initialState = {
    data: {
        people: []
    },
    status: NOT_STARTED,
    error: {}
};

const peopleReducer = function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PEOPLE_GET_PENDING: {
            return { ...state, status: LOADING };
        }

        case PEOPLE_GET_RESOLVED: {
            return state
        }

        case PEOPLE_GET_REJECTED: {
            return state;
        }

        default: {
            return state;
        }
    }
};

export default peopleReducer;
