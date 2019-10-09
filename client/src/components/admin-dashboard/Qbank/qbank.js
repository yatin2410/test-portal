import React, { Component } from "react";

export default class Qbank extends Component {
  render() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-md-center">
              <div className="col-2">
                <button className="btn btn-primary" onClick={()=>this.props.history.push('/dashboard/addquestion')}>
                  Add Question
                </button>
              </div>
            </div>
        </div>
    );
  }
}
