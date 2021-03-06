import React, { Component } from "react";

class Question extends Component {
  render() {
    const { question, o1, o2, o3, o4 } = this.props.activequestion;
    const { onAnsChange, Index, ans } = this.props;
    return (
      <div className="container mt-5 ml-3 que">
        <div className="mt-3">
          <label forhtml="question">
            <b>Question:</b>
          </label>
          <br />
          <div
            className="ml-4"
            dangerouslySetInnerHTML={{ __html: question }}></div>
        </div>
        <div className="mt-3">
          <label forhtml="option">
            <b>Options:</b>
          </label>
          <br />
          <div className="ml-4 mt-2" onClick={() => onAnsChange(Index, 1)}>
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(1) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o1 }}></label>
          </div>
          <div className="ml-4 mt-2" onClick={() => onAnsChange(Index, 2)}>
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(2) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o2 }}></label>
          </div>
          <div className="ml-4 mt-2" onClick={() => onAnsChange(Index, 3)}>
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(3) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o3 }}></label>
          </div>
          <div className="ml-4 mt-2" onClick={() => onAnsChange(Index, 4)}>
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(4) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o4 }}></label>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
