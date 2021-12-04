import React from 'react';
import d3 from 'd3';
import {select} from "d3-selection";
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';


///
class BuyGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {graphData: {}};
  }
  // console.log(props.data.commodities)
  // const data = props.data.commodities

  componentDidUpdate(prev) {
    // console.log(this.props.data.commodities)
    if (prev.data.commodities !== this.props.data.commodities) {
      // console.log(this.props.data.commodities)
      let data = this.props.data.commodities;
      let xData = [];
      let yData = [];
      let zData = [];
      for (var i = 0; i < data.length; i++) {
        xData.push(data[i]['demand'])
        yData.push(data[i]['demand'] * data[i]['sellPrice'])
        zData.push(data[i]['name'])
      }
      let trace = [{
          x: xData,
          y: yData,
          type: 'scatter',
          mode: 'markers',
          text: zData
      }]
      let layout = {
        log_x: true,
        log_y: true,
        xaxis: {title: "total demand"},
        yaxis: {title: "total potential profit"}
      }
      this.setState({graphData: {'trace': trace, 'layout': layout}})
    }
  }


  render() {
    return (
    <div>
      Sell to station:
      <Plot data={this.state.graphData['trace']} layout={this.state.graphData['layout']}/>
    </div>
    )
  }
}



var objArr = [
  {
      "buyPrice": 0,
      "demand": 1416,
      "demandBracket": 3,
      "meanPrice": 3105,
      "name": "agronomictreatment",
      "sellPrice": 3681,
      "statusFlags": [
          "Consumer"
      ],
      "stock": 0,
      "stockBracket": 0,
      "_id": "61aa7f4baf7f87e2907f1cd2"
  },
  {
      "buyPrice": 85,
      "demand": 1,
      "demandBracket": 0,
      "meanPrice": 113,
      "name": "hydrogenfuel",
      "sellPrice": 80,
      "statusFlags": [
          "Producer"
      ],
      "stock": 1461358,
      "stockBracket": 3,
      "_id": "61aa7f4baf7f87e2907f1cd3"
  },
  {
      "buyPrice": 0,
      "demand": 4838259,
      "demandBracket": 3,
      "meanPrice": 3160,
      "name": "hydrogenperoxide",
      "sellPrice": 3012,
      "statusFlags": [
          "Consumer"
      ],
      "stock": 0,
      "stockBracket": 0,
      "_id": "61aa7f4baf7f87e2907f1cd4"
  }]

export default BuyGraph