import React, { Component } from "react";
import { Line, Pie } from "react-chartjs-2";

const dataPie = {
  labels: ["Correct", "Wrong", "Not Attempted"],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgb(145, 231, 138)",
        "rgb(221, 144, 144)",
        "rgb(143, 180, 223)"
      ],
      hoverBackgroundColor: [
        "rgb(111, 235, 99)",
        "rgb(219, 106, 106)",
        "rgb(101, 156, 219)"
      ]
    }
  ]
};

const  options =  {
  responsive: true,
  title: {
    display: true,
    text: 'Performance Pie chart'
  },

};

class PieChart extends Component {
  constructor(props){
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      data : this.getData(props.quiz)
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.quiz){
      this.setState({data:this.getData(nextProps.quiz)});
    }
  }
  getData(quiz){
    let arr = [];
    arr.push(quiz.correct);
    arr.push(quiz.attempted-quiz.correct);
    arr.push(quiz.total-quiz.attempted);
    return arr;
  }
  render() {
    dataPie.datasets[0].data = this.state.data;
    return (
      <div>
        <Pie data={dataPie} height={150} options={options} />
      </div>
    );
  }
}

export default PieChart;
