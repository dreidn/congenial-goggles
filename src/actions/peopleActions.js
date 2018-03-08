import axios from "axios";
import * as URL from "url";
import _ from "lodash";

import * as actionTypes from "./types";

const API_ROOT = "https://swapi.co/api";

/* 
  Attempts to parse a resource ID from it's URL. Returns undefined if unable
  to find an ID.
*/
const getResourceId = url => {
  const u = URL.parse(url);
  if (u.hostname == null || u.pathname == null) {
    return undefined;
  }
  const id = parseInt(_.last(_.trim(u.pathname, "/").split("/")));
  return _.isNumber(id) ? id : undefined;
};

/*
  Gets the first page of people from the people endpoint.
*/
export const getPeople = url => {
  return dispatch => {
    const url = url || `${API_ROOT}/people/`;

    dispatch({ type: actionTypes.PEOPLE_GET_PENDING });

    return axios({
      method: "get",
      responseType: "json",
      url
    })
      .then(({ data: { results, next, previous, count } }) => {
        return dispatch({
          type: actionTypes.PEOPLE_GET_RESOLVED,
          payload: _.map(results, p => {
            return { ...p, id: getResourceId(p.url) };
          })
        });
      })
      .catch(err => {
        return dispatch({
          type: actionTypes.PEOPLE_GET_REJECTED,
          payload: err
        });
      });
  };
};

/*
  Gets all of the people from the people endpoint. Paginates using the 'next'
  URL in each response.
*/
export const getAllPeople = () => {
  return dispatch => {
    const root = `${API_ROOT}/people/`;
    let people = [];
    dispatch({ type: actionTypes.PEOPLE_GET_PENDING });
    const _getPerson = url => {
      axios({
        method: "get",
        responseType: "json",
        url
      })
        .then(({ data: { results, next, count } }) => {
          people = people.concat(
            _.map(results, p => {
              return { ...p, id: getResourceId(p.url) };
            })
          );
          if (next != null && people.length < count) _getPerson(next);
          else {
            return dispatch({
              type: actionTypes.PEOPLE_GET_RESOLVED,
              payload: people
            });
          }
        })
        .catch(err => {
          return dispatch({
            type: actionTypes.PEOPLE_GET_REJECTED,
            payload: err
          });
        });
    };
    _getPerson(root);
  };
};

/*
  Gets profile by ID
*/
export const getProfileByID = id => {
  const url = `${API_ROOT}/people/${id}/`;
  return getProfile(url);
};

/*
  Get profile from people endpoint using url
*/
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
        return dispatch({
          type: actionTypes.PROFILE_GET_REJECTED,
          payload: err
        });
      });
  };
};

/*
  Gets a starship resource using it's URL.
*/
export const getStarship = url => {
  return dispatch => {
    dispatch({ type: actionTypes.STARSHIP_GET_PENDING });
    return axios({
      method: "get",
      responseType: "json",
      url
    })
      .then(response => {
        return dispatch({
          type: actionTypes.STARSHIP_GET_RESOLVED,
          payload: { ...response.data, id: getResourceId(response.data.url) }
        });
      })
      .catch(err => {
        return dispatch({
          type: actionTypes.STARSHIP_GET_REJECTED,
          payload: err
        });
      });
  };
};
