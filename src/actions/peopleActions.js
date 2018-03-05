import axios from "axios";

import * as actionTypes from "./";

const API_ROOT = "https://swapi.co/api";

export const getPeople = () => {
  return dispatch => {
    const url = `${API_ROOT}/people/`;
    dispatch({ type: actionTypes.PEOPLE_GET_PENDING });

    axios({
      method: "get",
      responseType: "json",
      url
    })
      .then(response => {
        dispatch({
          type: actionTypes.PEOPLE_GET_RESOLVED,
          payload: response.data.results
        });
        console.log("Got people data,", JSON.stringify(response));
      })
      .catch(err => {
        dispatch({ type: actionTypes.PEOPLE_GET_REJECTED, error: err });
        console.log(err);
      });
  };
};

export const getPerson = url => {
  return (dispatch = () => {
    // const url = `${API_ROOT}/people/${id}`;
    dispatch({ type: actionTypes.PROFILE_GET_PENDING });
    axios
      .get(url)
      .then(response => {
        dispatch({ type: actionTypes.PROFILE_GET_RESOLVED, payload: response });
        console.log("Got person w/ url:", url, " ", JSON.stringify(response));
      })
      .catch(err => {
        dispatch({ type: actionTypes.PROFILE_GET_REJECTED, error: err });
        console.log(err);
      });
  });
};
