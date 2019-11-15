import React, { Component } from "react";
import Timer from "react-compound-timer";


export default class Timmer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        time: props.Time
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.Time) {
        this.setState({ time: nextProps.Time });
      }
    }
    render() {
      return (
        <div className="time-widget align-center">
          {this.state.time ? (
            <Timer
              initialTime={this.state.time * 60 * 1000}
              direction="backward"
              lastUnit="m"
              checkpoints={[
                {
                  time: 1000 * 60 * 5,
                  callback: () => alert("only five minutes remained")
                },
                {
                  time: 0,
                  callback: () => this.props.onSubmit()
                }
              ]}>
              Timer - <Timer.Minutes />:<Timer.Seconds />
            </Timer>
          ) : (
            <div>Timer - 0:0</div>
          )}
        </div>
      );
    }
  }