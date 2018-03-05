import { ERROR, LOADING, SUCCESS, NOT_STARTED } from "./statusTypes";
import {
  PEOPLE_GET_PENDING,
  PEOPLE_GET_RESOLVED,
  PEOPLE_GET_REJECTED
} from "../actions/types";

const initialState = {
  data: {
    profile: {}
  },
  status: NOT_STARTED,
  error: {}
};

const peopleReducer = function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_GET_PENDING: {
      return { ...state, status: LOADING };
    }

    case PROFILE_GET_RESOLVED: {
      return {
        ...state,
        status: SUCCESS,
        data: { ...state.data, profile: payload }
      };
    }

    case PROFILE_GET_REJECTED: {
      return { ...state, status: ERROR };
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;
