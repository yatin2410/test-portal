import React, { Component } from "react";
import SearchTable from "./quiztable";
import { connect } from "react-redux";
import { fetchUserQuizs } from "../../../actions/fetchActions";
import PropTypes from "prop-types";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuizs: [],
      upcomingQuizs: [],
    };
    this.onStart = this.onStart.bind(this);
  }
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.fetchUserQuizs(user.group);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.quizs.length!==0) {
        let quizs = nextProps.quizs.filter((item)=>((new Date(item.startDate)).getTime()<=(new Date()).getTime() && (new Date(item.endDate)).getTime()>(new Date()).getTime()));
        this.setState({currentQuizs:quizs});
        console.log(nextProps.quizs);
        console.log((new Date(nextProps.quizs[0].startDate)).getTime(),(new Date()).getTime());
        quizs = nextProps.quizs.filter(((item)=>(new Date(item.startDate)).getTime()>(new Date()).getTime() && (new Date(item.endDate).getTime()>(new Date()).getTime())));
        this.setState({upcomingQuizs:quizs});
    }
  }
  onStart(id){
    this.props.history.push("/takequiz/"+id);
  }
  render() {
    return (
      <div className="container">
          <div className="mt-5">
            <h4 className="row justify-content-md-center">
                Current Quizzes
            </h4>
            <SearchTable quizs={this.state.currentQuizs} onStart = {this.onStart} isCurrent={true}/>
          </div>
          <div className="mt-5">
            <h4 className="row justify-content-md-center">
                Upcoming Quizzes
            </h4>            
            <SearchTable quizs={this.state.upcomingQuizs} onStart = {this.onStart} isCurrent={false}/>              
          </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  fetchUserQuizs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quizs: state.data.quizs
});

export default connect(
  mapStateToProps,
  { fetchUserQuizs }
)(Quiz);
