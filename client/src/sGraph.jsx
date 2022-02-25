import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';
import * as d3 from 'd3';

class SellGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {graphData: {}};
    this.valueClick = this.valueClick.bind(this);
  }



  valueClick(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){
      pts = data.points[i].text;
    }
    this.props.getCommodityDetails(pts[0])
  };

  componentDidUpdate(prev) {
    if (prev.data.commodities !== this.props.data.commodities) {
      let data = this.props.data.commodities;
      let xData = [];
      let yData = [];
      let zData = [];
      for (var i = 0; i < data.length; i++) {
        xData.push(data[i]['demand'])
        yData.push(data[i]['demand'] * data[i]['sellPrice'])
        zData.push([data[i]['name'], data[i]['sellPrice']])
      }
      let trace = [{
        x: xData,
        y: yData,
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: '#ff9030',
        },
        text: zData,
        hoverformat: '~s',
        hovertemplate: '<i>Commodity:</i> %{text[0]} <br>'  +
        'Total demand: %{x} <br>' +
        'Unit price: %{text[1]} <br>' +
        'Total profit potential: %{y}',
      }]

      let layout = {
        margin: {
          t: 40,
          b: 50
        },
        plot_bgcolor: '#2b2a29',
        paper_bgcolor: '#2b2a29',
        font: {color: '#ff9030'},
        height: 510,
        width: 600,
        responsive: true,
        autosize: true,
        useResizeHandler: true,
        log_x: true,
        log_y: true,
        xaxis: {title: "total demand", color: '#66adee'},
        yaxis: {title: "total potential profit", color: '#66adee'},
        title: 'Sell to station'
      }

      this.setState({graphData: {'trace': trace, 'layout': layout }})
    }
  }

  render() {
    return (
      <Plot
      id="selltostation"
      data={this.state.graphData['trace']}
      layout={this.state.graphData['layout']}
      onClick={this.valueClick}
      getCommodityDetails={this.props.getCommodityDetails}/>
    )
  }
}


export default SellGraph