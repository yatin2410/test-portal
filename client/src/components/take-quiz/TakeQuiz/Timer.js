import React, { Component } from "react";
import Timer from "react-compound-timer";

export default class Timmer extends Component {
  constructor(props) {
    super(props);
    this.countCheckPoint = this.countCheckPoint.bind(this);
    this.state = {
      time: props.Time,
      checkpoints: this.countCheckPoint(props.Time)
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Time) {
      this.setState({
        time: nextProps.Time,
        checkpoints: this.countCheckPoint(nextProps.Time)
      });
    }
  }
  countCheckPoint(Time) {
    let time = Number(Time);
    let arr = [];
    for (let i = time; i > 0; i -= 5) {
      arr.push({
        time: i * 60 * 1000,
        callback: () => this.props.onSave()
      });
    }
    return arr;
  }
  render() {
    const checkpoints = [
      {
        time: 1000 * 60 * 5.5,
        callback: () =>
          this.props.putFlashMsg({
            msg: "Only 5 minutes are remaining",
            type: "alert-danger"
          })
      },
      ...this.state.checkpoints,
      {
        time: 0,
        callback: () => this.props.onSubmit()
      }
    ];
    console.log(checkpoints);
    return (
      <div className="time-widget align-center">
        {this.state.time ? (
          <Timer
            initialTime={this.state.time * 60 * 1000}
            direction="backward"
            lastUnit="m"
            checkpoints={checkpoints}>
            Timer - <Timer.Minutes />:<Timer.Seconds />
          </Timer>
        ) : (
          <div>Timer - 0:0</div>
        )}
      </div>
    );
  }
}
