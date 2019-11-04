import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editQuiz } from "../../../actions/putActions";
import { fetchQuiz, fetchGroups } from "../../../actions/fetchActions";

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

class EditQuiz extends Component {
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
      allGroups: [],
      questions: [],
      errors: {}
    };
    this.groupdata = [];
    this.editQuestions = this.editQuestions.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id);
    this.props.fetchGroups();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.quiz) {
      this.setState({ ...nextProps.quiz });
    }
    if (nextProps.groups) {
      this.setState({ allGroups: nextProps.groups.map((item)=>item.group) });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let submitGroups = this.state.allGroups.filter(
      item => this.groupdata[item].checked === true
    );
    const { name, startDate, duration, perToPass, questions } = this.state;
    const newQuiz = {
        _id: this.props.match.params.id,
      name,
      startDate: startDate
        ? new Date(startDate).toISOString()
        : new Date().toISOString(),
      duration,
      perToPass,
      groups: submitGroups,
      questions: questions
    };
    console.log(newQuiz);
    this.props.editQuiz(newQuiz, this.props.history);
  };
  checkboxClicked(item){
    console.log(item);
    let group = this.state.groups;
    if(group.indexOf(item)===-1){
      group.push(item);
      this.setState({groups:group});
    }
    else{
      group = group.filter((itm)=>itm!==item);
      this.setState({groups:group});
    }
  }
  onFocus(ele) {
    if (ele.current) ele.current.className += " label-active";
    else ele.reff.current.className += " label-active";
  }
  OnBlur(ele) {
    if (ele.current) ele.current.className = " label-txt";
    else ele.reff.current.className = "label-txt";
  }
  editQuestions() {
    this.props.history.push(
      "/dashboard/addquiz/questions/" + this.props.match.params.id
    );
  }
  render() {
    const { errors, allGroups, groups } = this.state;
    const arr = ["name", "startDate", "duration", "perToPass"];
    const arr1 = [this.name, this.startDate, this.duration, this.perToPass];
    return (
      <div>
        <div className="container">
          <div className="row  mt-2 justify-content-md-center">
            <div className="col-5">
              <h4>
                <b>Edit Quiz Details: </b>
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
                <p className="label-txt" ref={this.groups}>
                  Assign to groups:
                </p>
                <p className="error-txt">{errors.groups}</p>
                <div
                  id="groups"
                  className="mt-3"
                  onFocus={() => this.onFocus(this.groups)}
                  onBlur={() => this.OnBlur(this.groups)}>
                  {allGroups.map(item => (
                    <label className="ml-3">
                      <input
                        type="checkbox"
                        ref={ref => (this.groupdata[item] = ref)}
                        onClick = {()=>this.checkboxClicked(item)}
                        id={item}
                        checked={groups.indexOf(item)!==-1}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="row  mt-4-5 justify-content-md-center">
              <div style={{ float: "right" }}>
                <button
                  className="btn btn-primary btn-lg hoverable"
                  onClick={this.editQuestions}>
                  Edit Questions
                </button>
              </div>
              <div className="ml-4" style={{ float: "left" }}>
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

EditQuiz.propTypes = {
  fetchQuiz: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  editQuiz: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  groups: state.data.groups,
  quiz: state.data.quiz,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editQuiz, fetchQuiz, fetchGroups }
)(EditQuiz);
