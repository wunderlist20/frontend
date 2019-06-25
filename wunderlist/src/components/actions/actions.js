import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_TODOS_START = "FETCH_TODOS_START";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";

export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });

  return axios
    .post("http://localhost:5000/api/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: true });
    });
};

// export const delete = id => dispatch => {

//   return axios
// .delete('http://localhost:5000/api/${id}')
// .then(res => {
//   dispatch({ type: DELETE, payload: id});
// })
// .catch(err => {
//   console.log(err)
// });
// };

export const fetchTodos = () => dispatch => {
  dispatch({ type: FETCH_TODOS_START });
  axios
    .get("http://localhost:5000/api/todos", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: err });
    });
};

export const addTodo = newTodo => dispatch => {
  axios
    .post("http://localhost:5000/api/todos", newTodo, {
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
