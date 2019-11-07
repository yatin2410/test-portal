import React, { Component } from "react";
import "./css/takequiz.css";

class Question extends Component {
  render() {
    console.log(this.props.activequestion);
    const {question,o1,o2,o3,o4} = this.props.activequestion;
    return (
      <div className="container mt-5 ml-3 que">
        <div className="mt-3">
          <label forhtml="question"><b>Question:</b></label>
          <br/>
          <div className="ml-4" dangerouslySetInnerHTML={{__html:question}}>
          </div>
        </div>
        <div className="mt-3">
          <label forhtml="option"><b>Options:</b></label>
          <br/>
          <div className="ml-4 mt-2"> <input type="radio"/> <label className="ml-1" dangerouslySetInnerHTML={{__html:o1}}></label></div>
          <div className="ml-4 mt-2"> <input type="radio"/> <label className="ml-1" dangerouslySetInnerHTML={{__html:o2}}></label></div>
          <div className="ml-4 mt-2"> <input type="radio"/> <label className="ml-1" dangerouslySetInnerHTML={{__html:o3}}></label></div>
          <div className="ml-4 mt-2"> <input type="radio"/> <label className="ml-1" dangerouslySetInnerHTML={{__html:o4}}></label></div>
        </div>
        
      </div>
    );
  }
}

export default Question;
