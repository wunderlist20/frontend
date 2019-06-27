import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Form, Input, CardHeader, CardFooter } from "reactstrap";

import { fetchTodos, addTodo, deleteTodo } from "./actions/actions";

class TodoList extends React.Component {
  state = {
    title: "",
    task: "",
    setDate: ""
  };
  render() {
    return (
      <div className="todos-wrapper">
        {this.props.loading ? (
          <div className="loader">
            <Loader type="Grid" color="#00a2e3" height={200} width={200} />
          </div>
        ) : (
          <>
            {this.props.todos.map(todo => (
              <div className="card">
                <CardHeader tag="h3">{todo.title}</CardHeader>
                <div className="card-body">
                  <h1>{todo.task}</h1>
                  <button
                    className="btn-delete shd"
                    onClick={() => this.props.deleteTodo(todo.id)}
                  >
                    <h4>Delete</h4>
                  </button>
                  <CardFooter className="text-muted">
                    <h3>{todo.setDate}</h3>
                  </CardFooter>
                </div>
              </div>
            ))}
            <Form className="todo-form">
              <div>
                <Input
                  placeholder="What do you need to do?"
                  name="task"
                  value={this.state.task}
                  className="login-input"
                  onChange={this.handleChanges}
                />
                <i class="fas fa-list" />
              </div>
              <div>
                <Input
                  placeholder="What category is it?"
                  name="title"
                  value={this.state.title}
                  className="login-input"
                  onChange={this.handleChanges}
                />
                <i class="fas fa-bell" />
              </div>
              <div>
                <Input
                  placeholder="When is it due?"
                  name="setDate"
                  value={this.state.setDate}
                  className="login-input"
                  onChange={this.handleChanges}
                />
                <i class="fas fa-calendar-alt" />
              </div>
              <div>
                <div className="btn-login shd" onClick={this.addTodo}>
                  <h3>Add Todo</h3>
                </div>
                <i class="fas fa-sign-in-alt" />
              </div>
            </Form>
          </>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchTodos();
  }

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addTodo = e => {
    e.preventDefault();
    const newTodo = {
      title: this.state.title,
      task: this.state.task,
      setDate: this.state.setDate
    };
    this.props.addTodo(newTodo);
  };
}

const mapStateToProps = state => ({
  todos: state.todos,
  loading: state.loading
});

export default connect(
  mapStateToProps,
  {
    fetchTodos,
    addTodo, 
    deleteTodo
  }
)(TodoList);
