// Home - home.js

// import React, { Component } from "react";

// export default class Home extends Component {
//     render() {
//     return (
//       <div>
        
//       </div>
//     );
//   }
// }


import React, { Component } from "react";
import "./css/home.css";

export default class Home extends Component {
    render() {
    return (
      <div>
      <div className = "header">
        <div className = "float-left box-padding-20">
          <div className = "header-name ellipsis"> Quiz Name </div>
            <div className = "clear"></div>
        </div>

        <div className = "float-right box-padding-20">
          <div className = "user-name float-left medium-margin-right">Username</div>
          <div className="timer private-timer" time="442964">
            <div className="time-widget align-center">
            <div id="hours">122</div>
            <div className="colon">:</div>

            <div id="mins">30</div>
            <div className="colon">:</div>

            <div id="secs">25</div>
            <div className="weight-400 less-margin-left">left</div>
            <div className="clear"></div>
            </div>
          </div>
          <a className = "end-test button btn-red ajax-modal" href="#" className="end-test button btn-red ajax-modal" ajax="/AJAX/end_test_modal/919421/" target="end-test-modal">End Test</a>
          <div className="clear"></div>
        </div>
        <div className="clear"></div>

      </div>

      <div className = "body">
        <div class = "view-body">
      
          <div id="left-pane-question-list" class="left-pane">
            <div class="left-pane-header dark regular weight-700">
              <div class="float-left">1 Questions</div>
              <div class="float-right">Total Marks: 100.0</div>
              <div class="clear"></div>
            </div>  
          <div class="left-pane-content">
            <div class="section ml">
              <div class="section-header">
                <div class="float-left weight-700 regular dark">
                  1 Machine Learning Question
                </div>
                <div class="clear"></div>
              </div>
              <div class="section-content">
                <div id="d29423fc28004f5892608dbd3a0bd37a" class="show-question-statement question-item history ml-flow selected" execute="" activity-url="/AJAX/log/problem/viewed/" event-id="919421" p-type="machine-learning">
                  <div id="status-bar-d29423fc28004f5892608dbd3a0bd37a" class="status-bar float-left  tool-tip"></div>
                    <div class=" inline-block question-container float-left">
                      <div class="dark weight-600 float-left padding-10 width-100">
                        <div class="s-no padding-top-5 padding-left-5 float-left padding-right-5" private-url-hash="d29423fc28004f5892608dbd3a0bd37a">1. </div>
                          <div class="question-statement padding-top-5">
                            Predict the Passenger Level
                          </div>
                        </div>
                      </div>
                      <div class="inline-block float-right marks-container">
                        <div class="green-box darker weight-700 tool-tip top-border-radius bottom-border-radius">
                          + 100.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                <div id="prev" class="btn btn-success btn-round">prev</div>
                <div id="next" class="btn btn-success btn-round">next</div>
                <div id="clearResponse" class="btn btn-secondary btn-round">Clear Response</div>
                <button id="submitquiz" form="quizForm" class="btn btn-primary btn-round pull-right">submit quiz</button>

          </div>
        </div>

      </div>
    );
  }
}