import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Question from "./Question";
import Question2 from "./Question2";
import "./css/takequiz.css";
import { fetchUserQuizFull } from "../../../actions/fetchActions";
import { submitQuiz } from "../../../actions/putActions";
import classNames from "classnames";
import Timer from "react-compound-timer";


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

class Timmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time : null
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.Time){
      this.setState({time:nextProps.Time});
    }
  }
  render() {
    return (
      <div className="time-widget align-center">{this.state.time?
        <Timer 
          initialTime={this.state.time*60*1000}
          direction="backward"
          checkpoints={[
            {
              time:1000*60*5,
              callback:()=>alert("only five minutes remained"),
            },
            {
              time:0,
              callback:()=>this.props.onSubmit()
            }
          ]}
        >
          Timer - <Timer.Minutes />:<Timer.Seconds/>
        </Timer>
        :
        <div>Timer - 0:0</div>}
      </div>
    )
  }
}


class TakeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: {},
      activeIndex: 0,
      anss: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onClearResponse = this.onClearResponse.bind(this);
    this.onAnsChange = this.onAnsChange.bind(this);
    this.onAnsChange2 = this.onAnsChange2.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserQuizFull(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quiz) {
      let arr = [];
      for (let i = 0; i < parseInt(nextProps.quiz.quiz.questionsFull.length); i++) {
        arr.push([]);
      }
      console.log(nextProps.quiz);
      this.setState({ anss: arr });
      this.setState({ quiz: nextProps.quiz.quiz });
    }
  }
  onSubmit() {
    let submitAns = {
      userId: this.props.auth.user.id,
      qid:this.props.match.params.id,
      anss:{}
    };
    this.state.quiz.questionsFull.forEach((element,index) => {
      {submitAns.anss[element._id] = {ans:this.state.anss[index]}}
    });
    console.log(submitAns);
    this.props.submitQuiz(submitAns,this.props.history);
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
  onClearResponse() {
    let arr = [...this.state.anss];
    arr[this.state.activeIndex] = [];
    this.setState({ anss: arr });
  }
  onAnsChange(index, ans) {
    console.log(index,ans);
    let arr = [...this.state.anss];
    arr[index] = [ans];
    this.setState({ anss: arr });
  }
  onAnsChange2(index,ans){
    let arr = [...this.state.anss];
    if(arr[index].indexOf(ans)===-1){
      arr[index].push(ans);
    }
    else{
      arr[index] = arr[index].filter((item)=>item!==ans);
    }
    this.setState({anss: arr});
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
            <div className="timer private-timer">
              <Timmer Time={duration} onSubmit = {this.onSubmit}/>
            </div>
            <button
              className="end-test btn btn-danger"
              style={{ color: "white" }}
              onClick={this.onSubmit}>
              End Test
            </button>
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
               {(this.state.quiz.questionsFull===undefined || this.state.quiz.questionsFull[this.state.activeIndex].type==="1")?<Question Index={this.state.activeIndex} onAnsChange={this.onAnsChange} activequestion={this.state.quiz.questionsFull ? this.state.quiz.questionsFull[this.state.activeIndex] : {}} ans={this.state.anss[this.state.activeIndex]}/>:<Question2 Index={this.state.activeIndex} onAnsChange={this.onAnsChange2} activequestion={this.state.quiz.questionsFull ? this.state.quiz.questionsFull[this.state.activeIndex] : {}} ans={this.state.anss[this.state.activeIndex]}/>}
              </div>
              <div className="bottom-line ml-5 mb-4">
                <button className="btn btn-outline-primary btn-round btn-lg" onClick={this.onPrev}>
                  Prev
                </button>
                <button className="btn btn-primary btn-lg btn-round ml-3" onClick={this.onNext}>
                  Next
                </button>
                <button className="btn btn-outline-secondary btn-round btn-lg ml-5" onClick={this.onClearResponse}>
                  Clear Response
                </button>
                <button className="btn btn-outline-danger btn-lg btn-round btn-right" onClick={this.onSubmit}>
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TakeQuiz.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchUserQuizFull: PropTypes.func.isRequired,
  submitQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quiz: state.data.quizFull
});

export default connect(
  mapStateToProps,
  { fetchUserQuizFull,submitQuiz }
)(TakeQuiz);
