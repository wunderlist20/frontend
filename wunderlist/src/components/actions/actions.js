import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const DELETE_TODO = "DELETE_TODO";

export const FETCH_TODOS_START = "FETCH_TODOS_START";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";

export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

// Login

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });

  return axios
    .post("https://wunderlist-02.herokuapp.com/api/auth/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      dispatch({ type: LOGIN_SUCCESS });
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
  axios
    .post("https://wunderlist-02.herokuapp.com/api/todos/", newTodo, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log("hi", res.data);
      dispatch({ type: ADD_TODO, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_TODO_FAILURE, payload: err.response });
    });
};

// Delete Todo

export const deleteTodo = id => dispatch => {

  return axios
.delete('https://wunderlist-02.herokuapp.com/api/todos/:id')
.then(res => {
  dispatch({ type: DELETE_TODO, payload: id});
})
.catch(err => {
  console.log(err)
});
};

// Edit Todo

// View profile by ID

// Edit profile

// Delete profile