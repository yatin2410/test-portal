import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Question from "./Question";
import Question2 from "./Question2";
import "./css/viewquiz.css";
import { fetchUserQuizResult } from "../../../actions/fetchActions";
import classNames from "classnames";


function sideQuestion(props) {
  return (
    <div class={"question-item mt-3 " + classNames({ 'selected': props.qid === props.aid })} onClick={() => props.onChange(props.index)}>
      <div class="inline-block float-left">
        <div class="dark float-left padding-10 width-100">
          <div class="padding-top-5 padding-left-5 float-left padding-right-5">
            {props.index + 1}.{" "}
          </div>
          <div class="question-statement padding-top-5" dangerouslySetInnerHTML={{ __html: props.question }}>
          </div>
        </div>
      </div>
    </div>
  );
}

class ViewQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: {},
      activeIndex: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserQuizResult(this.props.match.params.id,this.props.auth.user.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quiz) {
      this.setState({ quiz: nextProps.quiz.quiz });
    }
  }

  onChange(index) {
    this.setState({ activeIndex: index });
  }
  onNext() {
    let index = this.state.activeIndex;
    if (this.state.quiz.questionsFull && index + 1 !== this.state.quiz.questionsFull.length) {
      this.setState({ activeIndex: index + 1 });
    }
  }
  onPrev() {
    let index = this.state.activeIndex;
    if (index !== 0) {
      this.setState({ activeIndex: index - 1 });
    }
  }
  render() {
    const { user } = this.props.auth;
    const { name, questionsFull, duration } = this.state.quiz;
    console.log(this.state.quiz.questionsFull);
    return (
      <div>
        <div className="header">
          <div className="float-left box-padding-20">
            <div className="header-name ellipsis"> {name} </div>
          </div>
          <div className="float-right box-padding-20">
            <div className="user-name float-left mr-3">ID: {user.Id}</div>
          </div>
        </div>
        <div className="body">
          <div class="view-body">
            <div class="left-pane">
              <div class="left-pane-header dark">
                <div class="float-right">
                  Total Questions: {questionsFull ? questionsFull.length : 0}
                </div>
                <div class="clear"></div>
              </div>
              <div class="left-pane-content">
                <div class="mt-3">
                  {questionsFull ? questionsFull.map((item, index) => sideQuestion({ index, onChange: this.onChange, question: item.question, qid: item._id, aid: this.state.quiz.questionsFull[this.state.activeIndex]._id })) : <br></br>}
                </div>
              </div>
            </div>
            <div className="right-pane">
              <div className="container">
               {(this.state.quiz.questionsFull===undefined || this.state.quiz.questionsFull[this.state.activeIndex].type==="1")?<Question Index={this.state.activeIndex} activequestion={this.state.quiz.questionsFull ? this.state.quiz.questionsFull[this.state.activeIndex] : {}} />:<Question2 Index={this.state.activeIndex} activequestion={this.state.quiz.questionsFull ? this.state.quiz.questionsFull[this.state.activeIndex] : {}} />}
              </div>
              <div className="bottom-line ml-5 mb-4">
                <button className="btn btn-outline-primary btn-round btn-lg" onClick={this.onPrev}>
                  Prev
                </button>
                <button className="btn btn-primary btn-lg btn-round ml-3" onClick={this.onNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewQuiz.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchUserQuizResult: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quiz: state.data.quizFull
});

export default connect(
  mapStateToProps,
  { fetchUserQuizResult }
)(ViewQuiz);
