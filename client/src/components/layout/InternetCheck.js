import React, { Component } from "react";
import { Detector } from "react-detect-offline";
import classNames from "classnames";

class InternetCheck extends Component {
  render() {
    return (
      <div>
        <Detector
          render={({ online }) => (
            <div
              className={
                online
                  ? "alert alert-danger online"
                  : "alert alert-danger offline"
              }>
              You are currently {online ? "online" : "offline"}
            </div>
          )}
        />
      </div>
    );
  }
}

export default InternetCheck;
