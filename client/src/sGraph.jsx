import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';


///
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
      let aData = [];
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
        height: 410,
        width: 500,
        responsive: true,
        autosize: true,
        useResizeHandler: true,
        log_x: true,
        log_y: true,
        xaxis: {title: "total demand"},
        yaxis: {title: "total potential profit"},
        title: 'Sell to station'
      }
      let click = this.valueClick

      this.setState({graphData: {'trace': trace, 'layout': layout, 'onClick': click}})
    }

  }

  render() {
    return (
      <div id="selltostation">
        <Plot
        data={this.state.graphData['trace']}
        layout={this.state.graphData['layout']}
        onClick={this.state.graphData['onClick']}
        getCommodityDetails={this.props.getCommodityDetails}/>
      </div>
    )
  }
}


export default SellGraph