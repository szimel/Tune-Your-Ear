import axios from "axios";
import { AUTH_USER, AUTH_ERROR, USER_PROFILE, CURRENT_USER, DIFFICULTY } from "./types";


//handle sign up
export const signup = (formData, callback) => dispatch => {
  axios.post(
    `/auth/signup`,
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
    `/auth/signin`,
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

//handle sign out
export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_USER, payload: '' });
  callback()
};

//handle adding answers to user profile
export const userAnswer = (data, callback) => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };
  axios.post(`/response`, data, config)
  .then(function (response) {
    dispatch({ type: USER_PROFILE, payload: response.data });
    callback();
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const currentUser = () => dispatch => {

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  }

  axios.get(
    `/auth/current_user`,
    config
    ).then(function (response) {
      dispatch({ type: CURRENT_USER, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//adding difficulty to state
export const quizMode = (e, callback) => dispatch => {
  
  axios.post(
    `/quiz`, {e})
    .then(function (response) {
      dispatch({ type: DIFFICULTY, payload: response.data });
      callback();
    }).catch(function (error) {
    console.log(error);
  });
};
