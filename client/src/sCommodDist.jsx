import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';
import React, { useState } from 'react';


let graph = (<div>palcehodler</div>);

function SellCommodCompare(props) {
  const [graphData] = useState({})

    if (props.data) {
      const data = props.data.markets;
      const title = props.data.commodity
      let xData = [];
      let yData = [];
      let zData = [];

      for (var i = 0; i < data.length; i++) {
        xData.push(data[i]['sellPrice'])
        yData.push(data[i]['demand'])
        zData.push([data[i]['station'], data[i]['system']])
      }

      graphData.trace = [
        {
          x: xData,
          y: yData,
          type: 'scatter',
          mode: 'markers',
          marker: {
            color: '#ff9030',
          },
          text: zData,
          hoverformat: '~s',
          hovertemplate: 'Station name: %{text[0]} <br>'  + 'System name: %{text[1]} <br>',
          transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>',
          value: 1
          }]
        },
        {
          x: xData,
          type: 'histogram',
          marker: {
            color: '#ff9030',
          },
          yaxis: 'y2',
        },
        {
          y: yData,
          type: 'histogram',
          marker: {
            color: '#ff9030',
          },
          xaxis: 'x2',
        }
      ],

      graphData.layout = {
        title: `${title} for sale around the galaxy:`,
        margin: {
          t: 40,
          b: 50
        },
        plot_bgcolor: '#2b2a29',
        paper_bgcolor: '#2b2a29',
        font: {color: '#ff9030'},
        height: 510,
        width: 600,
        showlegend: false,
        mirror: true,
        ticks:'outside',
        showline: true,
        xaxis: {
          domain: [0, 0.85],
          showgrid: false,
          zeroline: false,
          type: 'log',
          title: 'price per unit',
          color: '#66adee'
        },
        yaxis: {
          domain: [0, 0.85],
          showgrid: false,
          zeroline: false,
          type: 'log',
          title: 'total demand',
          color: '#66adee'
        },
        xaxis2: {
          domain: [0.85, 1],
          showgrid: true,
          zeroline: false,
          type: 'log'
        },
        yaxis2: {
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false,
          type: 'log'
        }
      }

    }

  return props.data ?
    <Plot data={graphData.trace} layout={graphData.layout} />
  : <div>Click on commodity point above to see more information</div>
}

export default SellCommodCompare