import React from "react";
import { Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import UpdateTodo from "./components/UpdateTodo";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path="/todolist" component={TodoList} />
      <PrivateRoute exact path="/update" component={UpdateTodo} />
    </div>
  );
}

export default App;

