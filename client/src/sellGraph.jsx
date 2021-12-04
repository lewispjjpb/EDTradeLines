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
        zData.push([data[i]['name'], data[i]['buyPrice']])
      }
      let trace = [{
          x: xData,
          y: yData,
          type: 'scatter',
          mode: 'markers',
          marker: {color: '#ff9030'},
          text: zData,
          hovertemplate: '<i>Commodity:</i> %{text[0]} <br>'  +
          'Total supply: %{x} <br>' +
          'Unit price: %{text[1]} <br>' +
          'Cost to purchase stock: %{y}',
      }]
      let layout = {
        plot_bgcolor: '#2b2a29',
        paper_bgcolor: '#2b2a29',
        font: {color: '#ff9030'},
        height: 500,
        width: 500,
        responsive: true,
        autosize: true,
        useResizeHandler: true,
        log_x: true,
        log_y: true,
        xaxis: {title: "total supply"},
        yaxis: {title: "total cost to buy"}
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