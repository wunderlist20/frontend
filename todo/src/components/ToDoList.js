import React from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo } from "../actions";

import "../App.css";

class ToDoList extends React.Component {
  state = {
    newTodo: ""
  };

  handleChanges = e => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = e => {
    e.preventDefault();
    debugger;
    this.props.addTodo(this.state.newTodo);
  };

  toggleTodo = (e, index) => {
    e.preventDefault();
    this.props.toggleTodo(index);
  };

  render() {
    console.log(this.props.todos);
    return (
      <div>
        <input
          type="text"
          value={this.state.newTodo}
          onChange={this.handleChanges}
          placeholder="Do Something Bro"
        />
        <button onClick={this.addTodo}>Add</button>

        <div className="ToDoList">
          {this.props.todos.map((todo, index) => (
            <h4 onClick={e => this.toggleTodo(e, index)} key={index}>
              {todo.completed && <i className="far fa-check-circle" />}
              {todo.value}
            </h4>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todosreducer.todos
});
export default connect(
  mapStateToProps,
  { addTodo, toggleTodo }
)(ToDoList);
