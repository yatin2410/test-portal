import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import {fetchGroups} from "../../actions/fetchActions";
import Navbar from '../layout/Navbar';

class Register extends Component {
  constructor() {
    super();
    this.Id = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.password2 = React.createRef();
    this.group = React.createRef();
    this.state = {
      Id: "",
      name: "",
      email: "",
      group: "",
      password: "",
      password2: "",
      errors: {},
      groups: []
    };
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    this.props.fetchGroups();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if(nextProps.data.groups){
      this.setState({
        groups : nextProps.data.groups
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
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  onFocus(ele){
    ele.current.className += " label-active";
  }
  OnBlur(ele){
    ele.current.className = "label-txt";
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
      <Navbar/>
      <div className="main-container mt-3">
      <div className="container">
        <div className="row  mt-2 justify-content-md-center">
	    		<div className="col-5">
              <h4>
                <b>Register</b> below
              </h4>
              <p  >
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>	
        </div>
        <form noValidate onSubmit={this.onSubmit}>
        <div className="row  mt-2 justify-content-md-center">
			<div className="col-5">
				<p className="label-txt" ref={this.Id}>Id</p>
        <p className="error-txt">{errors.Id}</p>
			    <input 
              className="input"
              onChange={this.onChange}
              value={this.state.Id}
              error={errors.Id}
              id="Id"
              type="text"
              onFocus={()=>{this.onFocus(this.Id)}}
              onBlur={()=>{this.OnBlur(this.Id)}}
          />				
			</div>
		</div>
		<div className="row mt-4-5 justify-content-md-center">
			<div className="col-5">
				<p className="label-txt" ref={this.name}>Name</p>
        <p className="error-txt">{errors.name}</p>
			    <input 
            type="text" 
            className="input"
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="name"
            onFocus={()=>{this.onFocus(this.name)}}
            onBlur={()=>{this.OnBlur(this.name)}}
          />				
			</div>
		</div>
		<div className="row  mt-4-5 justify-content-md-center">
			<div className="col-5">
				<p className="label-txt" ref={this.email}>Email</p>
        <p className="error-txt">{errors.email}</p>
			    <input 
            type="email" 
            className="input"
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            onFocus={()=>{this.onFocus(this.email)}}
            onBlur={()=>{this.OnBlur(this.email)}}
          />				
			</div>
		</div>
    <div className="row  mt-4-5 justify-content-md-center">
			<div className="col-5">
				<p className="label-txt" ref={this.group}>Group</p>
        <p className="error-txt">{errors.group}</p>
			    <select
            type="text" 
            className="input"
            onChange={this.onChange}
            value={this.state.group}
            error={errors.group}
            id="group"
            onFocus={()=>{this.onFocus(this.group)}}
            onBlur={()=>{this.OnBlur(this.group)}}
          >
            <option></option>
            {
              this.state.groups.map((item)=><option value={item.group}>{item.group}</option>)
            }
          </select>				
			</div>
		</div>
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
            onFocus={()=>{this.onFocus(this.password)}}
            onBlur={()=>{this.OnBlur(this.password)}}
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
            onFocus={()=>{this.onFocus(this.password2)}}
            onBlur={()=>{this.OnBlur(this.password2)}}
          />				
			</div>
		</div>
		<div className="row  mt-4-5 justify-content-md-center">
			<div className="col-md-auto">
			  <button className="btn btn-primary btn-lg hoverable" type="submit">Register</button>
			</div>
		</div>
	</form>
  </div>
  </div>
  </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  data: state.data,
});

export default connect(
  mapStateToProps,
  { registerUser, fetchGroups }
)(withRouter(Register));
