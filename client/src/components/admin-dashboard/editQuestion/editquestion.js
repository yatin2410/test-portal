import React, { Component } from "react";
import Editor from "../addQuestion/editor";
import { fetchQuestion } from "../../../actions/fetchActions";
import { putQuestion } from "../../../actions/putActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function OptionEditor(props) {
  return (
    <div className="row justify-content-md-center mt-3">
      <div className="col-1">
        <input
          type={props.type}
          name={"ao" + props.value}
          value={props.value}
          checked={props.state["ao" + props.value]}
          onChange={e => props.onAnsChange(e)}
        />
        <label forhtml={"o" + props.value}>
          {String.fromCharCode(Number(props.value) + 64) + "."}
        </label>
      </div>
      <div className="col-5">
        <Editor
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
          data={props.state["o" + props.value]}
          id={"o" + props.value}
          which={"o" + props.value}
          onEditorStateChange={props.onEditorStateChange}
        />
        <p className="error-txt">{props.errors["o" + props.value]}</p>
      </div>
    </div>
  );
}

class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "1",
      category: "1",
      question: "<p> Add question </P>",
      o1: "<p> Option-1 </P>",
      o2: "<p> Option-2 </P>",
      o3: "<p> Option-3 </P>",
      o4: "<p> Option-4 </P>",
      difficulty: "1",
      ao1: false,
      ao2: false,
      ao3: false,
      ao4: false,
      errors: {}
    };
    this.typeChange = this.typeChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onAnsChange = this.onAnsChange.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.setans = this.setans.bind(this);
  }
  setans(ans) {
    ans.forEach(item => {
      let str = "ao" + item;
      this.setState({ [str]: true });
    });
  }
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.question) {
      this.setState({ ...nextProps.question });
      if (nextProps.question.ans) this.setans(nextProps.question.ans);
    }
  }
  getans(data) {
    let ans = [];
    let arr = ["1", "2", "3", "4"];
    arr.forEach((item, ind) => {
      if (data["ao" + item]) ans.push(ind + 1);
    });
    return ans;
  }
  submitQuestion() {
    const data = {
      _id: this.props.match.params.id,
      type: this.state.type,
      category: this.state.category,
      question: this.state.question,
      o1: this.state.o1,
      o2: this.state.o2,
      o3: this.state.o3,
      o4: this.state.o4,
      ans: this.getans(this.state),
      difficulty: this.state.difficulty
    };
    this.props.putQuestion(data, this.props.history);
  }

  typeChange(event) {
    let val = event.target.value;
    this.setState({ ao1: false, ao2: false, ao3: false, ao4: false });
    this.setState({
      type: val
    });
  }
  categoryChange(event) {
    let val = event.target.value;
    this.setState({
      category: val
    });
  }
  difficultyChange(event) {
    let val = event.target.value;
    this.setState({
      difficulty: val
    });
  }
  onEditorStateChange(editorState, which) {
    this.setState({
      [which]: editorState.editor.getData()
    });
  }

  onAnsChange(event) {
    if (this.state.type === "1") {
      this.setState({ ao1: false, ao2: false, ao3: false, ao4: false });
    }
    let val = this.state[event.target.name];
    this.setState({
      [event.target.name]: !val
    });
  }

  render() {
    const arr = ["1", "2", "3", "4"];
    const { errors } = this.state;
    return (
      <div className="container mt-3">
        <h6>
          <Link to="/dashboard/qbank" className="arrowFont">
            <i
              class="fas fa-arrow-left arrowFont"
              style={{ fontSize: "0.75em" }}></i>{" "}
            Back to Question Bank{" "}
          </Link>
        </h6>
        <div className="row justify-content-md-center mt-3">
          <div className="col-6">
            <label forhtml="questiontype">Question Type:</label>
            <select
              className="custom-select"
              id="questiontype"
              value={this.state.type}
              onChange={e => this.typeChange(e)}>
              <option value="1">Multiple choice single answer</option>
              <option value="2">Multiple choice multiple answer</option>
            </select>
          </div>
        </div>
        <div className="row justify-content-md-center mt-3">
          <div className="col-6">
            <label forhtml="questioncategory">Question Category:</label>
            <select
              className="custom-select"
              id="questioncategory"
              value={this.state.category}
              onChange={e => this.categoryChange(e)}>
              <option value="1">IT</option>
              <option value="2">Aptitude</option>
            </select>
          </div>
        </div>
        <div className="row justify-content-md-center mt-3">
          <div className="col-1">
            <label forhtml="question">Question:</label>
          </div>
          <div className="col-5">
            <Editor
              name="question"
              id="questoin"
              data={this.state.question}
              which="question"
              onEditorStateChange={this.onEditorStateChange}
            />
            <p className="error-txt">{errors.question}</p>
          </div>
        </div>
        {arr.map(item => (
          <OptionEditor
            errors={errors}
            key={item}
            type={this.state.type === "1" ? "radio" : "checkbox"}
            value={item}
            state={this.state}
            ans={this.state.ans}
            onAnsChange={this.onAnsChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        ))}
        <div className="row justify-content-md-center mt-3">
          <div className="col-6">
            <label forhtml="difficulty">Difficulty Level:</label>
            <select
              className="custom-select"
              id="difficulty"
              value={this.state.difficulty}
              onChange={e => this.difficultyChange(e)}>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </div>
        </div>
        <div
          className="row justify-content-md-center mt-3"
          style={{ marginBottom: "100px" }}>
          <div className="col-3">
            <button onClick={this.submitQuestion} className="btn modi-btn">
              Edit Question
            </button>
            <p className="error-txt">{errors.ans}</p>
          </div>
          {/* <div className="col-3" style={{float:"left"}}>
          <button className="btn btn-primary">submit</button>
          </div> */}
        </div>
      </div>
    );
  }
}

EditQuestion.propTypes = {
  fetchQuestion: PropTypes.func.isRequired,
  putQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  question: state.data.question
});

export default connect(mapStateToProps, { fetchQuestion, putQuestion })(
  EditQuestion
);
