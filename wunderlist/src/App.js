import React from "react";
import { Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import TechList from "./components/TechList";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  return (
    <div className="App">
     <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={TechList} />
      <PrivateRoute exact path="/todolist" component={TodoList} />
    </div>
  );
}

export default App;

