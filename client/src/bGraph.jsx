import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';


class BuyGraph extends React.Component {
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
        xaxis: {title: "total supply", color: '#66adee'},
        yaxis: {title: "total cost to buy", color: '#66adee'},
        title: 'Buy from station'
      }

      this.setState({graphData: {'trace': trace, 'layout': layout }})
    }
  }


  render() {
    return (
      <div testClick={(string) => string}>
        <Plot
        data={this.state.graphData['trace']}
        layout={this.state.graphData['layout']}
        onClick={this.valueClick}
        getCommodityDetails={this.props.getCommodityDetails}/>

      </div>
    )
  }
}


export default BuyGraph