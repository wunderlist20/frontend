import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Form, Input, Button } from "reactstrap";
// import { TweenLite, Power1 } from "gsap";

import { fetchTodos, addTodo } from "./actions/actions";

class TodoList extends React.Component {
  state = {
    item: "",
    label: "",
    due: ""
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
                <h3>{todo.due}</h3>
                <div className="card-body">
                  <h1>{todo.item}</h1>
                  <h3>{todo.label}</h3>
                </div>
              </div>
            ))}
            <Form className="todo-form">
              <div>
                <Input
                  placeholder="What do you need to do?"
                  name="item"
                  value={this.state.item}
                  className="login-input"
                  onChange={this.handleChanges}
                />
                <i class="fas fa-list" />
              </div>
              <div>
                <Input
                  placeholder="How important is it?"
                  name="label"
                  value={this.state.label}
                  className="login-input"
                  onChange={this.handleChanges}
                />
                <i class="fas fa-bell" />
              </div>
              <div>
                <Input
                  placeholder="When is it due?"
                  name="due"
                  value={this.state.due}
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
      item: this.state.item,
      label: this.state.label,
      due: this.state.due
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
    addTodo
  }
)(TodoList);
