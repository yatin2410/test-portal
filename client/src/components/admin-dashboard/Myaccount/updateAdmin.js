import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateAdmin, logoutUser } from "../../../actions/authActions";

class UpdateAdmin extends Component {
  constructor(props) {
    super(props);
    this.Id = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
    this.oldpassword = React.createRef();
    this.password = React.createRef();
    this.password2 = React.createRef();
    this.group = React.createRef();
    const { Id, name, email } = this.props.auth.user;
    this.state = {
      Id: Id,
      name: name,
      email: email,
      oldpassword: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onFocus = this.onFocus.bind(this);
  }
  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      Id: this.state.Id,
      name: this.state.name,
      email: this.state.email,
      oldpassword: this.state.oldpassword,
      password: this.state.password,
      password2: this.state.password2,
      group: "Admin",
    };

    this.props.updateAdmin(newUser,this.props.logoutUser);
    
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
        <div className="container">
          <div className="row  mt-2 justify-content-md-center">
            <div className="col-5">
              <h4>
                <b>EDIT: </b>
              </h4>
            </div>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row  mt-2 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.Id}>
                  Id
                </p>
                <p className="error-txt">{errors.Id}</p>
                <input
                  className="input"
                  onChange={this.onChange}
                  value={this.state.Id}
                  error={errors.name}
                  disabled
                  id="Id"
                  type="text"
                  onFocus={() => {
                    this.onFocus(this.Id);
                  }}
                  onBlur={() => {
                    this.OnBlur(this.Id);
                  }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.email}>
                  Email
                </p>
                <p className="error-txt">{errors.email}</p>
                <input
                  type="email"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  disabled
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
            <div className="row mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.name}>
                  Name
                </p>
                <p className="error-txt">{errors.name}</p>
                <input
                  type="text"
                  className="input"
                  disabled
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  onFocus={() => {
                    this.onFocus(this.name);
                  }}
                  onBlur={() => {
                    this.OnBlur(this.name);
                  }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.oldpassword}>
                  Old Password
                </p>
                <p className="error-txt">{errors.oldpassword}</p>
                <input
                  type="Password"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.oldpassword}
                  error={errors.oldpassword}
                  id="oldpassword"
                  onFocus={() => {
                    this.onFocus(this.oldpassword);
                  }}
                  onBlur={() => {
                    this.OnBlur(this.oldpassword);
                  }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.password}>
                  Password
                </p>
                <p className="error-txt">{errors.password}</p>
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
              <div className="col-5">
                <p className="label-txt" ref={this.password2}>
                  Confirm Password
                </p>
                <p className="error-txt">{errors.password2}</p>
                <input
                  type="Password"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  onFocus={() => {
                    this.onFocus(this.password2);
                  }}
                  onBlur={() => {
                    this.OnBlur(this.password2);
                  }}
                />
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-md-auto">
                <button
                  className="btn btn-primary btn-lg hoverable"
                  type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

UpdateAdmin.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  updateAdmin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateAdmin, logoutUser }
)(withRouter(UpdateAdmin));
