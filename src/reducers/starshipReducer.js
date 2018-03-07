import { ERROR, LOADING, SUCCESS, NOT_STARTED } from "./statusTypes";
import {
  STARSHIP_GET_PENDING,
  STARSHIP_GET_RESOLVED,
  STARSHIP_GET_REJECTED
} from "../actions/types";

const initialState = {
  data: {
    starships: []
  },
  status: NOT_STARTED,
  error: {}
};

const starshipReducer = function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STARSHIP_GET_PENDING: {
      return { ...state, status: LOADING };
    }

    case STARSHIP_GET_RESOLVED: {
      return {
        ...state,
        data: {
          starships: state.data.starships.concat([payload])
        },
        status: SUCCESS
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

export default starshipReducer;
