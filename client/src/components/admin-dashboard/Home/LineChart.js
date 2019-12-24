import React, { Component } from "react";
import { Line, Pie } from "react-chartjs-2";

const data = {
  labels: [],
  datasets: [
    {
      label: "Avg. percentage",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(224, 231, 235,0.3)",
      borderColor: "rgb(131, 160, 153)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(57,70,78)",
      pointBackgroundColor: "rgb(57,70,78)",
      pointBorderWidth: 5,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: "rgb(57, 70, 78)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: "Required",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(204, 204, 173,0.4)",
      borderColor: "rgb(105, 104, 61)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(49, 49, 22)",
      pointBackgroundColor: "rgb(57,70,78)",
      pointBorderWidth: 5,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: "rgb(57, 70, 78)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

const options = {
  responsive: true,
  title: {
    display: true,
    text: "Quiz performace"
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Quiz Name"
        },
        ticks: {
          padding: 10
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Avg. Percentage"
        },
        ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 10,
          max: 100,
          padding: 10
        }
      }
    ]
  }
};

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.changeData = this.changeData.bind(this);
    this.state = {
      ...this.changeData(props.quizs)
    };
  }
  changeData(arr) {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    if (arr && arr.length !== 0) {
      arr.forEach(item => {
        arr1.push(item.name);
        arr2.push((Number(item.totalPer) / Number(item.total)).toFixed(2));
        arr3.push(item.perToPass);
      });
    }
    return {
      labels: arr1,
      data: arr2,
      perToPass: arr3
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quizs) {
      let obj = this.changeData(nextProps.quizs);
      this.setState({ ...obj });
    }
  }
  render() {
    data.labels = this.state.labels;
    data.datasets[0].data = this.state.data;
    data.datasets[1].data = this.state.perToPass;
    return (
      <div>
        <Line data={data} options={options} height={250} />
      </div>
    );
  }
}

export default LineChart;
