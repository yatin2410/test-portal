import React, { Component } from "react";
import PropTypes from "prop-types";
import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel  } from "victory";

const data = [
  { x: "test-1", y: 1.2 },
  { x: "test-2", y: 2.7 },
  { x: "test-3", y: 1.5 },
  { x: "test-4", y: 4.8 },
  { x: "test-5", y: 3.6 },
  { x: "test-6", y: 5.7 }
];

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col ml-3 mt-5">
        <VictoryChart domainPadding={20} >
        <VictoryAxis
          label={'Quizzes'}
          tickValues={this.props.xLabels}
          tickLabelComponent={<VictoryLabel style={{textAnchor:'end', fontSize: '12px'}} />}
        />
        <VictoryAxis
          label={'Percentages'}
          dependentAxis={true}
          tickLabelComponent={<VictoryLabel style={{fontSize: '7.5px'}} />}
        />
          <VictoryLine
            interpolation="linear" data={data} 
            style={{ data: { stroke: "#c43a31" } }}
          />
          <VictoryScatter data={data} 
            size={5}
            style={{ data: { fill: "#c43a31" } }}
          />
        </VictoryChart>
      </div>
      <div className="col">
        Hello
      </div>
      </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
