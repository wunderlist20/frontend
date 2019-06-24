export const ADD_TODO = "addTodo";
export const TOGGLE_TODO = "toggleTodo";

export function addTodo(newTodo) {
  return {
    type: ADD_TODO,
    payload: newTodo
  };
}

export function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    payload: index
  };
}
