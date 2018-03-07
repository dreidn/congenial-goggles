import { ERROR, LOADING, SUCCESS, NOT_STARTED } from "./statusTypes";
import {
  PROFILE_GET_PENDING,
  PROFILE_GET_RESOLVED,
  PROFILE_GET_REJECTED,
  STARSHIP_GET_PENDING,
  STARSHIP_GET_RESOLVED,
  STARSHIP_GET_REJECTED
} from "../actions/types";

const initialState = {
  data: {
    profile: {},
    starships: []
  },
  status: NOT_STARTED,
  error: {}
};

const profileReducer = function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_GET_PENDING: {
      return { ...state, status: LOADING };
    }

    case PROFILE_GET_RESOLVED: {
      return {
        ...state,
        status: SUCCESS,
        data: { ...state.data, profile: payload, starships: [] }
      };
    }

    case PROFILE_GET_REJECTED: {
      return { ...state, status: ERROR };
    }

    case STARSHIP_GET_PENDING: {
      return state;
    }

    case STARSHIP_GET_RESOLVED: {
      return {
        ...state,
        data: {
          ...state.data,
          starships: [...state.data.starships, payload]
        }
      };
    }

    case STARSHIP_GET_REJECTED: {
      return { ...state, status: ERROR };
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;
