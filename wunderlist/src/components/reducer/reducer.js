import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO,
  ADD_TODO_FAILURE,
  DELETE_TODO,
  TODO_UPDATE_SUCCESS
} from "../actions/actions";

const initialState = {
  todos: [],
  loggingIn: false,
  error: null,
  loading: true,
  token: localStorage.getItem("token")
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        error: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: false,
        token: localStorage.getItem("token")
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload
      };
    case FETCH_TODOS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
        loading: false,
        error: null
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_TODO:
      return {
        ...state,
        todos: action.payload
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case TODO_UPDATE_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      };
    default:
      return state;
  }
};

export default reducer;
