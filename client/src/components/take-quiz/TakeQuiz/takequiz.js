import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Question from "./Question";
import Question2 from "./Question2";
import { SaveAndfetchUserQuizFull } from "../../../actions/fetchActions";
import { submitQuiz, saveQuiz, putFlashMsg } from "../../../actions/putActions";
import Loading from "../../layout/Loading";
import lodash from "lodash";
import sideQuestion from "./SideQustion";
import Timmer from "./Timer";
import SuccessAlert from "../../layout/Flash";
import classNames from "classnames";
import InternetCheck from "../../layout/InternetCheck";
class TakeQuiz extends Component {
  constructor(props) {
    super(props);
    this.ele = React.createRef();
    this.state = {
      quiz: {},
      activeIndex: 0,
      anss: [],
      savedAnss: [],
      isLoading: true
    };
    this.onSave = this.onSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onClearResponse = this.onClearResponse.bind(this);
    this.onAnsChange = this.onAnsChange.bind(this);
    this.onAnsChange2 = this.onAnsChange2.bind(this);
  }
  componentDidMount() {
    this.props.SaveAndfetchUserQuizFull(
      this.props.match.params.id,
      this.props.auth.user.id
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quiz && nextProps.quiz.questionsFull) {
      let arr = [];
      for (let i = 0; i < parseInt(nextProps.quiz.questionsFull.length); i++) {
        if (nextProps.quiz.questionsFull[i].userAns)
          arr.push(nextProps.quiz.questionsFull[i].userAns);
        else arr.push([]);
      }
      if (nextProps.quiz.submitTime && nextProps.quiz.submitTime === true) {
        this.props.putFlashMsg({
          msg: "Quiz is already sumbmitted!",
          type: "alert-danger"
        });
        this.props.history.push("/dashboard/quiz");
      }
      let startTime = nextProps.quiz.startTime;
      let diff = new Date().getTime() - new Date(startTime).getTime();
      let duration = diff / (1000 * 60);
      let actualDuration = Number(nextProps.quiz.duration);
      if (actualDuration - duration < 0) {
        this.props.putFlashMsg({
          msg: "Quiz Time is up!",
          type: "alert-danger"
        });
        this.props.history.push("/dashboard/quiz");
      }
      nextProps.quiz.duration = actualDuration - duration;
      this.setState({ anss: arr });
      this.setState({ savedAnss: arr });
      this.setState({ quiz: nextProps.quiz });
      this.setState({ isLoading: false });
    }
  }
  onSubmit() {
    let submitAns = {
      userId: this.props.auth.user.id,
      qid: this.props.match.params.id,
      anss: {},
      submitTime: true
    };
    this.state.quiz.questionsFull.forEach((element, index) => {
      {
        submitAns.anss[element._id] = { ans: this.state.anss[index] };
      }
    });
    this.props.submitQuiz(submitAns, this.props.history);
  }
  onSave() {
    if (lodash.isEqual(this.state.anss, this.state.savedAnss) === false) {
      let submitAns = {
        userId: this.props.auth.user.id,
        qid: this.props.match.params.id,
        anss: {}
      };
      let arr = this.state.anss;
      this.state.quiz.questionsFull.forEach((element, index) => {
        {
          submitAns.anss[element._id] = { ans: this.state.anss[index] };
        }
      });
      this.setState({ savedAnss: arr });
      this.props.saveQuiz(submitAns);
    }
  }
  onChange(index) {
    this.setState({ activeIndex: index });
  }
  onNext() {
    let index = this.state.activeIndex;
    if (
      this.state.quiz.questionsFull &&
      index + 1 !== this.state.quiz.questionsFull.length
    ) {
      this.setState({ activeIndex: index + 1 });
      this.ele.current.scrollTop += 85;
    }
  }
  onPrev() {
    let index = this.state.activeIndex;
    if (index !== 0) {
      this.setState({ activeIndex: index - 1 });
      this.ele.current.scrollTop -= 85;
    }
  }
  onClearResponse() {
    let arr = [...this.state.anss];
    arr[this.state.activeIndex] = [];
    this.setState({ anss: arr });
  }

  onAnsChange(index, ans) {
    let arr = [...this.state.anss];
    arr[index] = [ans];
    this.setState({ anss: arr });
  }
  onAnsChange2(index, ans) {
    let arr = [...this.state.anss];
    if (arr[index].indexOf(ans) === -1) {
      arr[index].push(ans);
    } else {
      arr[index] = arr[index].filter(item => item !== ans);
    }
    this.setState({ anss: arr });
  }
  render() {
    const { user } = this.props.auth;
    const { name, questionsFull, duration } = this.state.quiz;
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ marginLeft: "13%" }}>
            <Loading />
          </div>
        ) : (
          <div>
            <div className="header">
              <div className="header-name ellipsis"> {name} </div>
              <div className="float-right box-padding-20">
                <div className="user-name float-left mr-3">ID: {user.Id}</div>
                <div className="timer private-timer">
                  <Timmer
                    Time={duration}
                    onSave={this.onSave}
                    onSubmit={this.onSubmit}
                    putFlashMsg={this.props.putFlashMsg}
                  />
                </div>
                <button
                  className="end-test btn"
                  // style={{ color: "rgb(78, 78, 57)" }}
                  onClick={this.onSubmit}>
                  End Test
                </button>
              </div>
            </div>
            <div className="body">
              <div className="view-body">
                <div className="left-pane" ref={this.ele}>
                  <div className="left-pane-header dark">
                    <div className="float-right">
                      Total Questions:{" "}
                      {questionsFull ? questionsFull.length : 0}
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="left-pane-content">
                    <div className="mt-3">
                      {questionsFull ? (
                        questionsFull.map((item, index) =>
                          sideQuestion({
                            index,
                            onChange: this.onChange,
                            question: item.question,
                            ans: this.state.anss,
                            qid: item._id,
                            aid: this.state.quiz.questionsFull[
                              this.state.activeIndex
                            ]._id
                          })
                        )
                      ) : (
                        <br></br>
                      )}
                    </div>
                  </div>
                </div>
                <div className="rig ht-container">
                  <div className="right-pane">
                    <div className="container">
                      {this.state.quiz.questionsFull === undefined ||
                      this.state.quiz.questionsFull[this.state.activeIndex]
                        .type === "1" ? (
                        <Question
                          Index={this.state.activeIndex}
                          onAnsChange={this.onAnsChange}
                          activequestion={
                            this.state.quiz.questionsFull
                              ? this.state.quiz.questionsFull[
                                  this.state.activeIndex
                                ]
                              : {}
                          }
                          ans={this.state.anss[this.state.activeIndex]}
                        />
                      ) : (
                        <Question2
                          Index={this.state.activeIndex}
                          onAnsChange={this.onAnsChange2}
                          activequestion={
                            this.state.quiz.questionsFull
                              ? this.state.quiz.questionsFull[
                                  this.state.activeIndex
                                ]
                              : {}
                          }
                          ans={this.state.anss[this.state.activeIndex]}
                        />
                      )}
                    </div>
                  </div>
                  <div className="bottom-line">
                    <SuccessAlert />
                    <InternetCheck />
                    <button
                      className="btn btn-round btn-lg "
                      onClick={this.onPrev}>
                      Prev
                    </button>
                    <button
                      className="btn btn-lg btn-round ml-3 modi-btn"
                      onClick={this.onNext}>
                      Next
                    </button>
                    <button
                      className="btn btn-round btn-lg ml-5 "
                      onClick={this.onClearResponse}>
                      Clear Response
                    </button>
                    <button
                      className="btn btn-lg btn-round btn-right modi-btn"
                      onClick={this.onSave}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

TakeQuiz.propTypes = {
  auth: PropTypes.object.isRequired,
  SaveAndfetchUserQuizFull: PropTypes.func.isRequired,
  submitQuiz: PropTypes.func.isRequired,
  putFlashMsg: PropTypes.func.isRequired,
  saveQuiz: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quiz: state.data.quizFull.quizFull
});

export default connect(mapStateToProps, {
  SaveAndfetchUserQuizFull,
  submitQuiz,
  saveQuiz,
  putFlashMsg
})(TakeQuiz);
