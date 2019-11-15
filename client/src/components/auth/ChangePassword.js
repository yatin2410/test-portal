import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import Navbar from "../layout/Navbar";

class ChangePassword extends Component {
  constructor() {
    super();
    this.password = React.createRef();
    this.password2 = React.createRef();
    this.state = {
      password: "",
      password2: "",
      errors: {},
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.OnBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      _id:this.props.match.params.id,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.changePassword(userData,this.props.history);
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
                <b>Update Your Password:</b>
              </h4>
            </div>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.password}>Password</p>
                <p className="error-txt">{errors.password}</p>
                <input
                  type="Password"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  onFocus={() => { this.onFocus(this.password) }}
                  onBlur={() => { this.OnBlur(this.password) }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.password2}>Confirm Password</p>
                <p className="error-txt">{errors.password2}</p>
                <input
                  type="Password"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  onFocus={() => { this.onFocus(this.password2) }}
                  onBlur={() => { this.OnBlur(this.password2) }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-md-auto">
                <button className="btn btn-primary btn-lg hoverable" type="submit">Update</button>
                <p className="error-txt mt-5 ml-1">{errors.submit}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(ChangePassword);
