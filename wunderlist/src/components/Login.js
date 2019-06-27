import React from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { Form, Input } from "reactstrap";
import { login } from "./actions/actions";

class Login extends React.Component {
  state = {
    creds: {
      username: "",
    password: ""
    }
  };

  render() {
    return (
      <div className="login-wrapper">
        <Form>
          <h2 className="login-here">Ready to get started?</h2>
          <div>
            <Input
              placeholder="username"
              name="username"
              value={this.state.creds.username}
              onChange={this.handleChanges}
              className={
                this.props.error === true
                  ? "error login-input"
                  : "login-input"
              }
              required
            />
            <i className="fas fa-user" />
          </div>
          <div>
            <Input
              type="password"
              placeholder="password"
              name="password"
              value={this.state.creds.password}
              onChange={this.handleChanges}
              className={
                this.props.error === true
                  ? "error login-input"
                  : "login-input"
              }
              required
            />
            <i className="fas fa-key" />
          </div>
          <div>
            <div className="btn-login shd" onClick={this.login}>
              {this.props.loggingIn === true ? (
                <Loader
                  type="ThreeDots"
                  color="##00bfff"
                  height={80}
                  width={80}
                />
              ) : (
                <h3>Sign In</h3>
              )}
            </div>
            <i className="fas fa-sign-in-alt" />
          </div>
        </Form>
        <div className="login-splash" />
      </div>
    );
  }

    componentDidMount() {
    if (this.props.token) {
      this.props.history.push("/");
    }
  }

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      creds: {
        ...this.state.creds,
      [e.target.name]: e.target.value
    }
    });
  };

  login = (e) => {
    e.preventDefault();
console.log("clicked")
    this.props.login(this.state.creds)
    .then(() => this.props.history.push('/todolist'));
};
}

const mapStateToProps = ({ token, loggingIn, error }) => ({
  token,
  loggingIn,
  error
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
