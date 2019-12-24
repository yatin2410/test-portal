import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Question from "./Question";
import Question2 from "./Question2";
import { fetchUserQuizResult, fetchUser } from "../../../actions/fetchActions";
import classNames from "classnames";
import Loading from "../../layout/Loading";
import lodash from "lodash";

function sideQuestion(props) {
  return (
    <div
      className={
        "question-item " +
        classNames(
          { selected: props.qid === props.aid },
          { answered: !lodash.isEmpty(props.ans) }
        )
      }
      onClick={() => props.onChange(props.index)}>
      <div class="inline-block float-left">
        <div class="dark float-left padding-10 width-100">
          <div class="padding-top-5 padding-left-5 float-left padding-right-5">
            {props.index + 1}.{" "}
          </div>
          <div
            class="question-statement padding-top-5"
            dangerouslySetInnerHTML={{ __html: props.question }}></div>
        </div>
      </div>
    </div>
  );
}

class ViewQuizAdmin extends Component {
  constructor(props) {
    super(props);
    this.ele = React.createRef();
    this.state = {
      quiz: {},
      activeIndex: 0,
      user: null,
      isLoading: true
    };
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserQuizResult(
      this.props.match.params.id1,
      this.props.match.params.id2,
      this.props.history
    );
    this.props.fetchUser(this.props.match.params.id2);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quiz && nextProps.quiz.quizFull) {
      this.setState({ quiz: nextProps.quiz.quizFull });
      this.setState({ isLoading: false });
    }
    if (nextProps.user && nextProps.user.name) {
      this.setState({ user: nextProps.user });
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
  render() {
    const user = this.state.user;
    const { name, questionsFull, duration } = this.state.quiz;
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ marginLeft: "10%" }}>
            <Loading />
          </div>
        ) : (
          <div>
            <div className="header">
              <div className="float-left box-padding-20">
                <div className="header-name ellipsis"> {name} </div>
              </div>
              <div className="float-right box-padding-20">
                <div className="user-name float-left mr-3">
                  ID: {user ? user.Id : null}
                </div>
              </div>
            </div>
            <div className="body">
              <div class="view-body">
                <div class="left-pane" ref={this.ele}>
                  <div class="left-pane-header dark">
                    <div class="float-right">
                      Total Questions:{" "}
                      {questionsFull ? questionsFull.length : 0}
                    </div>
                    <div class="clear"></div>
                  </div>
                  <div class="left-pane-content">
                    <div class="mt-3">
                      {questionsFull ? (
                        questionsFull.map((item, index) =>
                          sideQuestion({
                            index,
                            onChange: this.onChange,
                            question: item.question,
                            ans: item.userAns,
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
                <div>
                  <div className="right-pane">
                    <div className="container">
                      {this.state.quiz.questionsFull === undefined ||
                      this.state.quiz.questionsFull[this.state.activeIndex]
                        .type === "1" ? (
                        <Question
                          Index={this.state.activeIndex}
                          activequestion={
                            this.state.quiz.questionsFull
                              ? this.state.quiz.questionsFull[
                                  this.state.activeIndex
                                ]
                              : {}
                          }
                        />
                      ) : (
                        <Question2
                          Index={this.state.activeIndex}
                          activequestion={
                            this.state.quiz.questionsFull
                              ? this.state.quiz.questionsFull[
                                  this.state.activeIndex
                                ]
                              : {}
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="bottom-line">
                    <button
                      className="btn btn-round btn-lg"
                      onClick={this.onPrev}>
                      Prev
                    </button>
                    <button
                      className="btn modi-btn btn-lg btn-round ml-3"
                      onClick={this.onNext}>
                      Next
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

ViewQuizAdmin.propTypes = {
  fetchUserQuizResult: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quiz: state.data.quizFull,
  user: state.data.user
});

export default connect(mapStateToProps, { fetchUserQuizResult, fetchUser })(
  ViewQuizAdmin
);
