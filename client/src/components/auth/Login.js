import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import "./css/register.css";

class Login extends Component {
  constructor() {
    super();
    this.email = React.createRef();
    this.password = React.createRef();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.OnBlur.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onFocus(ele) {
    ele.current.className += " label-active";
  }
  OnBlur(ele) {
    ele.current.className = "label-txt";
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row  mt-5 justify-content-md-center">
            <div className="col-5">
              <h4>
                <b>Login</b> below
              </h4>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.email}>
                  Email
                </p>
                <p className="error-txt">
                  {errors.email}
                  {errors.emailnotfound}
                </p>
                <input
                  type="email"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  onFocus={() => {
                    this.onFocus(this.email);
                  }}
                  onBlur={() => {
                    this.OnBlur(this.email);
                  }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.password}>
                  Password
                </p>
                <p className="error-txt">
                  {errors.password}
                  {errors.passwordincorrect}
                </p>
                <input
                  type="Password"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  onFocus={() => {
                    this.onFocus(this.password);
                  }}
                  onBlur={() => {
                    this.OnBlur(this.password);
                  }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-md-auto">
                <button
                  className="btn btn-primary btn-lg hoverable"
                  type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="row mt-4-5 mr-5 d-flex flex-row-reverse">
            <div className="col-5">
            <Link to="/forgotPassword">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
