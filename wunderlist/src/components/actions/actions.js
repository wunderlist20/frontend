import axios from "axios";
import { axiosWithAuth } from "../../utilities/axiosWithAuth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const DELETE_TODO = "DELETE_TODO";

export const FETCH_TODOS_START = "FETCH_TODOS_START";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";

export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const EDIT_TODO_START = "EDIT_TODO_START";
export const EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS";
export const EDIT_TODO_FAILURE = "EDIT_TODO_FAILURE";

// Login

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });

  return axiosWithAuth()
    .post("/auth/login", creds)
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
  axiosWithAuth()
    .get("/todos")
    .then(res => {
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: err });
    });
};

// Add Todo - add a new todo, and return the created object. title, task and setDate are required fields. user_id, notes, and completed are optional fields.

export const addTodo = newTodo => dispatch => {
  console.log(newTodo)
  axiosWithAuth()
    .post("/todos", newTodo)
    .then(res => {
      console.log(res.data)
      dispatch({ type: ADD_TODO, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_TODO_FAILURE, payload: err.response });
    });
};

// Delete Todo

export const deleteTodo = id => dispatch => {
  return axiosWithAuth()
    .delete(`/todos/${id}`)
    .then(res => {
      dispatch({ type: DELETE_TODO, payload: res.data.id });
    })
    .catch(err => {
      console.log(err);
    });
};

// Edit Todo

export const editTodo = (id, changes) => dispatch => {
  dispatch({ type: EDIT_TODO_START });
  axiosWithAuth()
    .put(`/todos/${id}`, changes)
    .then(res => {
      dispatch({ type: EDIT_TODO_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_TODO_FAILURE, payload: err });
    });
};

// View profile by ID

// Edit profile

// Delete profile
