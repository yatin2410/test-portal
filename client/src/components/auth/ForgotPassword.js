import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import "./css/register.css";

class ForgotPassword extends Component {
    constructor() {
        super();
        this.email = React.createRef();
        this.state = {
          email: "",
          errors: {}
        };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.OnBlur.bind(this);
      }
      componentWillReceiveProps(nextProps){
          if(nextProps.errors){
              console.log(nextProps.errors);
              this.setState({errors:nextProps.errors.errors});
          }
      }
      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
      onSubmit = e => {
        e.preventDefault();    
        const userData = {
          email: this.state.email
        };
        this.props.forgotPassword(userData,this.props.history);
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
                <b>Forgot Password</b>
              </h4>
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
              <div className="col-md-auto">
                <button
                  className="btn btn-primary btn-lg hoverable"
                  type="submit">
                  Send Reset Link
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPassword);