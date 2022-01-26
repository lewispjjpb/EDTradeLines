import ReactDOM from 'react-dom';
import React, { useState } from 'react';
const Plot = React.lazy(() => import('react-plotly.js'));


function BuyCommodCompare(props) {
  const [graphData] = useState({});

    if (props.data) {
      if (typeof(props.data) === 'object') {
        const data = props.data.markets;
        const title = props.data.commodity;
        let thisMarket = 0;
        for (var i = 0; i < props.currentStation.commodities.length; i++) {
          if (props.currentStation.commodities[i].name === title) {
            thisMarket = i;
          }
        }
        let xData = [];
        let yData = [];
        let zData = [];

        for (var i = 0; i < data.length; i++) {
          xData.push(data[i]['buyPrice'])
          yData.push(data[i]['stock'])
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
          },
          {
            x: [props.currentStation.commodities[thisMarket].buyPrice],
            y: [props.currentStation.commodities[thisMarket].stock],
            type: 'scatter',
            mode: 'markers',
            marker: {
              color: '#66adee',
              symbol: 'x',
              size: 10,
            },
            text: [props.currentStation.stationName],
            textposition: "bottom center",
            textfont: {
              color: '#66adee'
            }
          },
        ],

        graphData.layout = {
          title: `${title} for purchase around the galaxy:`,
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
          xaxis: {
            // showgrid: false,
            // zeroline: false,
            type: 'log',
            title: 'price per unit',
            color: '#66adee'
          },
          yaxis: {
            // showgrid: false,
            // zeroline: false,
            type: 'log',
            title: 'total supply',
            color: '#66adee'
          },
        }
      }
    }

  return (typeof(props.data) === 'object') ?
    <React.Suspense fallback={<div>Loading graph...</div>}>
      <Plot data={graphData.trace} layout={graphData.layout} />
    </React.Suspense>
  : <div>{props.data}</div>
}

export default BuyCommodCompare