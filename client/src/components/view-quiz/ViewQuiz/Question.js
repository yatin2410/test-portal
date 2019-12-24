import React, { Component } from "react";

class Question extends Component {
  render() {
    const { question, o1, o2, o3, o4 } = this.props.activequestion;
    let ans = this.props.activequestion.userAns;
    let ansReal = this.props.activequestion.ans;
    const { Index } = this.props;
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
          <div className="ml-4 mt-2">
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(1) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o1 }}></label>
            {ansReal ? (
              ansReal.indexOf(1) !== -1 ? (
                <i
                  className="material-icons ml-5"
                  style={{ color: "green", fontSize: "1.85em" }}>
                  done
                </i>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="ml-4 mt-2">
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(2) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o2 }}></label>
            {ansReal ? (
              ansReal.indexOf(2) !== -1 ? (
                <i
                  className="material-icons ml-5"
                  style={{ color: "green", fontSize: "1.85em" }}>
                  done
                </i>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="ml-4 mt-2">
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(3) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o3 }}></label>
            {ansReal ? (
              ansReal.indexOf(3) !== -1 ? (
                <i
                  className="material-icons ml-5"
                  style={{ color: "green", fontSize: "1.85em" }}>
                  done
                </i>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="ml-4 mt-2">
            {" "}
            <input
              type="radio"
              name="ans"
              checked={ans ? ans.indexOf(4) !== -1 : false}
            />{" "}
            <label
              className="ml-1"
              dangerouslySetInnerHTML={{ __html: o4 }}></label>
            {ansReal ? (
              ansReal.indexOf(4) !== -1 ? (
                <i
                  className="material-icons ml-5"
                  style={{ color: "green", fontSize: "1.85em" }}>
                  done
                </i>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
