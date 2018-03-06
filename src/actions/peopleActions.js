import axios from "axios";
import * as URL from "url";
import _ from "lodash";

import * as actionTypes from "./types";

const API_ROOT = "https://swapi.co/api";

const getResourceId = url => {
  const u = URL.parse(url);
  if (u.hostname == null || u.pathname == null) {
    return undefined;
  }
  const id = parseInt(_.last(_.trim(u.pathname, "/").split("/")));
  return _.isNumber(id) ? id : undefined;
};

export const getPeople = () => {
  return dispatch => {
    const url = `${API_ROOT}/people/`;

    dispatch({ type: actionTypes.PEOPLE_GET_PENDING });

    return axios({
      method: "get",
      responseType: "json",
      url
    })
      .then(response => {
        console.log("Got people data,", JSON.stringify(response));

        return dispatch({
          type: actionTypes.PEOPLE_GET_RESOLVED,
          payload: _.map(response.data.results, p => {
            return { ...p, id: getResourceId(p.url) };
          })
        });
      })
      .catch(err => {
        console.log(err);

        return dispatch({ type: actionTypes.PEOPLE_GET_REJECTED, error: err });
      });
  };
};

export const getProfileByID = id => {
  const url = `${API_ROOT}/people/${id}/`;
  return getProfile(url);
};

export const getProfile = url => {
  return dispatch => {
    dispatch({ type: actionTypes.PROFILE_GET_PENDING });

    return axios({
      method: "get",
      responseType: "json",
      url
    })
      .then(response => {
        return dispatch({
          type: actionTypes.PROFILE_GET_RESOLVED,
          payload: response.data
        });
      })
      .catch(err => {
        return dispatch({ type: actionTypes.PROFILE_GET_REJECTED, error: err });
        console.log(err);
      });
  };
};

export const getStarship = url => {
  return dispatch => {
    console.log("getting starship: ", url);

    dispatch({ type: actionTypes.STARSHIP_GET_PENDING });
    return axios({
      method: "get",
      responseType: "json",
      url
    })
      .then(response => {
        console.log("got starship", response);
        dispatch({
          type: actionTypes.STARSHIP_GET_RESOLVED,
          payload: { ...response.data, id: getResourceId(response.data.url) }
        });
        console.log("wat");
      })
      .catch(err => {
        console.log(err);

        return dispatch({
          type: actionTypes.STARSHIP_GET_REJECTED,
          error: err
        });
      });
  };
};
