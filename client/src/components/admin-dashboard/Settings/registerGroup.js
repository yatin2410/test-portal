import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerGroup } from "../../../actions/putActions";

class RegisterGroup extends Component {
  constructor(props) {
    super(props);
    this.group = React.createRef();
    this.state = {
      group:"",
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
      group : this.state.group,
    };
    this.props.registerGroup(newUser, this.props.fetchGroups);    
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
                Add Group:
              </h4>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row mt-3 justify-content-md-center"  style={{paddingLeft:"30%"}}>
              <div className="col">
                <p className="label-txt" ref={this.group}>
                  Group
                </p>
                <p className="error-txt">{errors.group}</p>
                <input
                  className="input"
                  onChange={this.onChange}
                  value={this.state.group}
                  error={errors.group}
                  id="group"
                  type="text"
                  onFocus={() => {
                    this.onFocus(this.group);
                  }}
                  onBlur={() => {
                    this.OnBlur(this.group);
                  }}
                />
              </div>
            </div>
            <div className="row  mt-4-5"  style={{paddingLeft:"30%"}}>
                <button
                  style={{height:"3em"}}
                  className="btn btn-primary ml-3 hoverable"
                  type="submit">
                  submit
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

RegisterGroup.propTypes = {
  registerGroup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.putResponse.errors,
});

export default connect(
  mapStateToProps,
  { registerGroup }
)(withRouter(RegisterGroup));
