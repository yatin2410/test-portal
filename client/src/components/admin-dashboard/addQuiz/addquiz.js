import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {addQuiz} from "../../../actions/putActions";
import { fetchGroups } from "../../../actions/fetchActions";

function InputComponent(props) {
  const { reff, name, onChange, state, errors, onFocus, OnBlur, type } = props;

  return (
    <div className="row  mt-4 justify-content-md-center">
      <div className="col-5">
        <p className="label-txt" ref={reff}>
          {name}
        </p>
        <p className="error-txt">{errors[name]}</p>
        <input
          className="input"
          onChange={onChange}
          value={state[name]}
          error={errors[name]}
          id={name}
          type={type}
          onFocus={() => {
            onFocus({ reff });
          }}
          onBlur={() => {
            OnBlur({ reff });
          }}
        />
      </div>
    </div>
  );
}

class AddQuiz extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.startDate = React.createRef();
    this.duration = React.createRef();
    this.perToPass = React.createRef();
    this.groups = React.createRef();
    this.state = {
      name: "",
      startDate: "",
      duration: "",
      perToPass: "",
      groups: [],
      errors: {}
    };
    this.groupdata = [];
  }
  componentDidMount(){
        this.props.fetchGroups();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.groups) {
      this.setState({ groups: nextProps.groups.map((item)=>item.group) });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let submitGroups = this.state.groups.filter((item)=>this.groupdata[item].checked===true);  
    const {name,startDate,duration,perToPass} = this.state;
    const newQuiz = {
        name,
        startDate:startDate?(new Date(startDate)).toISOString():(new Date()).toISOString(),
        duration,
        perToPass,
        groups: submitGroups,
        questions: [],
    };
    console.log(newQuiz);
    this.props.addQuiz(newQuiz,this.props.history);
  };

  onFocus(ele) {
    if(ele.current)
    ele.current.className += " label-active"
    else
    ele.reff.current.className += " label-active";
  }
  OnBlur(ele) {
    if(ele.current)
    ele.current.className = " label-txt"
    else
    ele.reff.current.className = "label-txt";
  }

  render() {
    const { errors,groups } = this.state;
    const arr = ["name", "startDate", "duration", "perToPass"];
    const arr1 = [this.name, this.startDate, this.duration, this.perToPass];
    return (
      <div>
        <div className="container">
          <div className="row  mt-2 justify-content-md-center">
            <div className="col-5">
              <h4>
                <b>Add Quiz Details: </b>
              </h4>
            </div>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            {arr.map((item, ind) => (
              <InputComponent
                name={item}
                type={item === "startDate" ? "datetime-local" : "text"}
                reff={arr1[ind]}
                onChange={this.onChange}
                state={this.state}
                errors={errors}
                onFocus={this.onFocus}
                OnBlur={this.OnBlur}
              />
            ))}
            <div className="row  mt-4 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.groups} >
                  Assign to groups:
                </p>
                <p className="error-txt">{errors.groups}</p>
                <div id="groups" className="mt-3" onFocus={()=>this.onFocus(this.groups)} onBlur={()=>this.OnBlur(this.groups)}>
                {groups.map((item)=>
                    <label className="ml-3"><input type="checkbox" ref={(ref)=>this.groupdata[item]=ref} id={item}/>{item}</label>
                )}
              </div>
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div className="col-md-auto">
                <button
                  className="btn btn-primary btn-lg hoverable"
                  type="submit">
                Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddQuiz.propTypes = {
    addQuiz: PropTypes.func.isRequired,
    fetchGroups: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    groups: state.data.groups,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {addQuiz,fetchGroups}
)(AddQuiz);
