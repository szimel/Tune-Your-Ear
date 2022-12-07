import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";


const hacky = 'http://localhost:5000';


//handle sign ups
export const signup = (formData, callback) => dispatch => {
  axios.post(
    `${hacky}/auth/signup`,
    formData
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

//handle logins
export const login = (formData, callback) => dispatch => {
  axios.post(
    `${hacky}/auth/signin`,
    formData
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};