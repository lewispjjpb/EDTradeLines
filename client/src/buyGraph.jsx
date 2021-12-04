import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';


///
class BuyGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {graphData: {}};
  }


  componentDidUpdate(prev) {

    if (prev.data.commodities !== this.props.data.commodities) {

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


export default BuyGraph