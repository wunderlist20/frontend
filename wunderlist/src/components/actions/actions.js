import axios from "axios";
import { axiosWithAuth } from "../../utilities/axiosWithAuth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_TODOS_START = "FETCH_TODOS_START";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";

export const ADD_TODO_START = "ADD_TODO_START";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const DELETE_TODO = "DELETE_TODO";

export const TODO_UPDATE_START = "TODO_UPDATE_START";
export const TODO_UPDATE_SUCCESS = "TODO_UPDATE_SUCCESS";
export const TODO_UPDATE_FAILURE = "TODO_UPDATE_FAILURE";

export const TOGGLE_TODO = "TOGGLE_TODO";


// Login

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });

  return axiosWithAuth()
    .post("https://wunderlist-02.herokuapp.com/api/auth/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: true });
    });
};

// Register new user

// Fetch Todos

export const fetchTodos = () => dispatch => {
  dispatch({ type: FETCH_TODOS_START });
  axios
    .get("https://wunderlist-02.herokuapp.com/api/todos/", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: err });
    });
};

// Add Todo - add a new todo, and return the created object. title, task and setDate are required fields. user_id, notes, and completed are optional fields.

export const addTodo = newTodo => dispatch => {
  dispatch({ type: ADD_TODO_START });
  axios
    .post("https://wunderlist-02.herokuapp.com/api/todos/", newTodo, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log(res)
      dispatch({ type: ADD_TODO_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_TODO_FAILURE, payload: err.response });
    });
};

// Delete Todo

export const deleteTodo = id => dispatch => {
  return axiosWithAuth()
    .delete(`https://wunderlist-02.herokuapp.com/api/todos/${id}`)
    .then(res => {
      dispatch({ type: DELETE_TODO, payload: res.data.id });
    })
    .catch(err => {
      console.log(err);
    });
};

// Update Todo

export const updateTodo = (id, changes) => dispatch => {
  console.log(changes)
  dispatch({ type: TODO_UPDATE_START });
  return axiosWithAuth()
    .put(`https://wunderlist-02.herokuapp.com/api/todos/${id}`, changes)
    .then(res => {
      dispatch({ type: TODO_UPDATE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: TODO_UPDATE_FAILURE, payload: err });
    });
};

// View profile by ID

// Edit profile

// Delete profile

// Complete Todo

export function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    payload: index
  };
};