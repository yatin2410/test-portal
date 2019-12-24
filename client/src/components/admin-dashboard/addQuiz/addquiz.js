import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuiz, addRandom } from "../../../actions/putActions";
import { fetchGroups } from "../../../actions/fetchActions";
import { Link } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

function InputComponent(props) {
  const {
    reff,
    name,
    onChange,
    state,
    errors,
    onFocus,
    OnBlur,
    type,
    labelName
  } = props;

  return (
    <div className="row  mt-4 justify-content-md-center">
      <div className="col-5">
        <p className="label-txt" ref={reff}>
          {labelName}
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
    this.endDate = React.createRef();
    this.duration = React.createRef();
    this.perToPass = React.createRef();
    this.groups = React.createRef();
    this.state = {
      name: "",
      startDate: "",
      endDate: "",
      duration: "",
      perToPass: "",
      groups: [],
      errors: {}
    };
    this.groupdata = [];
  }
  componentDidMount() {
    this.props.fetchGroups();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.groups) {
      this.setState({ groups: nextProps.groups.map(item => item.group) });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChange1 = startDate => this.setState({ startDate });
  onChange2 = endDate => this.setState({ endDate });

  onSubmit = e => {
    e.preventDefault();
    let submitGroups = this.state.groups.filter(
      item => this.groupdata[item].checked === true
    );
    const { name, startDate, duration, perToPass, endDate } = this.state;
    const newQuiz = {
      name,
      startDate: startDate ? new Date(startDate) : "",
      endDate: endDate ? new Date(endDate) : "",
      duration,
      perToPass,
      groups: submitGroups,
      questions: []
    };
    this.props.addQuiz(newQuiz, this.props.history);
  };

  onSubmit1 = e => {
    e.preventDefault();
    let submitGroups = this.state.groups.filter(
      item => this.groupdata[item].checked === true
    );
    const { name, startDate, duration, perToPass, endDate } = this.state;
    const newQuiz = {
      name,
      startDate: startDate ? new Date(startDate) : "",
      endDate: endDate ? new Date(endDate) : "",
      duration,
      perToPass,
      groups: submitGroups,
      questions: []
    };
    this.props.addRandom(newQuiz, this.props.history);
  };

  onFocus(ele) {
    if (ele.current) ele.current.className += " label-active";
    else ele.reff.current.className += " label-active";
  }
  OnBlur(ele) {
    if (ele.current) ele.current.className = " label-txt";
    else ele.reff.current.className = "label-txt";
  }

  render() {
    const { errors, groups } = this.state;
    const arr = ["name", "duration", "perToPass"];
    const arr1 = [this.name, this.duration, this.perToPass];
    const arr2 = ["Name", "Duration (min)", "Percentage To Pass"];
    return (
      <div>
        <div className="container mt-3">
          <h6>
            <Link to="/dashboard/quiz" className="arrowFont">
              <i
                class="fas fa-arrow-left arrowFont"
                style={{ fontSize: "0.75em" }}></i>{" "}
              Back to Quiz Page{" "}
            </Link>
          </h6>
          <div className="row  mt-2 justify-content-md-center">
            <div className="col-5 mt-4">
              <h4>
                <b>Add Quiz Details: </b>
              </h4>
            </div>
          </div>
          <form noValidate>
            {arr.map((item, ind) => (
              <InputComponent
                name={item}
                type={"text"}
                reff={arr1[ind]}
                onChange={this.onChange}
                state={this.state}
                labelName={arr2[ind]}
                errors={errors}
                onFocus={this.onFocus}
                OnBlur={this.OnBlur}
              />
            ))}
            <div className="row  mt-4 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.startDate}>
                  Start Date
                </p>
                <p className="error-txt">{errors.startDate}</p>
                <div className="mt-4">
                  <DateTimePicker
                    value={this.state.startDate}
                    onChange={this.onChange1}
                    onFocus={() => this.onFocus(this.startDate)}
                    onBlur={() => this.OnBlur(this.startDate)}
                  />
                </div>
              </div>
            </div>

            <div className="row  mt-4 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.endDate}>
                  End Date
                </p>
                <p className="error-txt">{errors.endDate}</p>
                <div className="mt-4">
                  <DateTimePicker
                    value={this.state.endDate}
                    onChange={this.onChange2}
                    onFocus={() => this.onFocus(this.endDate)}
                    onBlur={() => this.OnBlur(this.endDate)}
                  />
                </div>
              </div>
            </div>

            <div className="row  mt-4 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.groups}>
                  Assign to Groups:
                </p>
                <p className="error-txt">{errors.groups}</p>
                <div
                  id="groups"
                  className="mt-3"
                  onFocus={() => this.onFocus(this.groups)}
                  onBlur={() => this.OnBlur(this.groups)}>
                  {groups.map(item => (
                    <label className="ml-3">
                      <input
                        type="checkbox"
                        ref={ref => (this.groupdata[item] = ref)}
                        id={item}
                      />{" "}
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="row  mt-4 justify-content-md-center">
              <div className="col-5">
                <p className="label-txt" ref={this.addQuestions}>
                  Add Questions:
                </p>
              </div>
            </div>
            <div className="row  mt-4-5 mb-4 justify-content-md-center">
              <div className="col-md-auto">
                <button
                  className="btn btn-lg hoverable mr-3 modi-btn"
                  onClick={this.onSubmit1}>
                  Randomly
                </button>
                <button
                  className="btn btn-lg hoverable ml-3 modi-btn"
                  onClick={this.onSubmit}
                  type="submit">
                  Manually
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
  addRandom: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  groups: state.data.groups,
  errors: state.errors
});

export default connect(mapStateToProps, { addQuiz, fetchGroups, addRandom })(
  AddQuiz
);
