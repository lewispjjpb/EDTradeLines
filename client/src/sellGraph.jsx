import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';


///
class SellGraph extends React.Component {
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
        xData.push(data[i]['stock'])
        yData.push(data[i]['stock'] * data[i]['buyPrice'])
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
        xaxis: {title: "total supply"},
        yaxis: {title: "total potential profit"}
      }
      this.setState({graphData: {'trace': trace, 'layout': layout}})
    }
  }


  render() {
    return (
    <div>
      Buy from station:
      <Plot data={this.state.graphData['trace']} layout={this.state.graphData['layout']}/>
    </div>
    )
  }
}


export default SellGraph