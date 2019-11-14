import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../../../actions/authActions";
import "./css/registeradmin.css";

class RegisterAdmin extends Component {
  constructor(props) {
    super(props);
    this.Id = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.password2 = React.createRef();
    this.state = {
      Id: "",
      name: "",
      email: "",
      group: "",
      password: "",
      errors: {}
    };
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
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
      group: this.state.group,
      password: this.state.password
    };
    this.props.registerAdmin(newUser, this.props.fetchUsers);    
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
        <div className="row my-2 pt-4 ml-1" style={{paddingLeft:"30%"}}>
              <h4>
                Add Admin:
              </h4>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row mt-3 justify-content-md-center"  style={{paddingLeft:"30%"}}>
              <div className="col">
                <p className="label-txt" ref={this.Id}>
                  Id
                </p>
                <p className="error-txt">{errors.Id}</p>
                <input
                  className="input"
                  onChange={this.onChange}
                  value={this.state.Id}
                  error={errors.name}
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
            <div className="row mt-4-5 justify-content-md-center"  style={{paddingLeft:"30%"}}>
              <div className="col">
                <p className="label-txt" ref={this.name}>
                  Name
                </p>
                <p className="error-txt">{errors.name}</p>
                <input
                  type="text"
                  className="input"
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
            <div className="row  mt-4-5 "  style={{paddingLeft:"30%"}}>
              <div className="col">
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
            <div className="row  mt-4-5"  style={{paddingLeft:"30%"}}>
              <div className="col">
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
            <div className="row  mt-4-5"  style={{paddingLeft:"30%"}}>
                <button
                  style={{height:"3em"}}
                  className="btn btn-primary ml-3 hoverable"
                  type="submit">
                  Add Admin
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

RegisterAdmin.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerAdmin }
)(withRouter(RegisterAdmin));
