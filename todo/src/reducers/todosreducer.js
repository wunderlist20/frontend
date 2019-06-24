import { ADD_TODO, TOGGLE_TODO } from "../actions";

const initialState = {
  todos: [
    { value: "Take Kilo to the vet", completed: true },
    { value: "Re-watch end of today's lecture", completed: false }
  ]
};

export const todosreducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        value: action.payload,
        completed: false
      };
      return {
        ...state,
        todos: [...state.todos, newTodo]
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          action.payload === index
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    default:
      console.log(state);
      return state;
  }
};
