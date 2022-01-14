import ReactDOM from 'react-dom';
import React, { useState } from 'react';
const Plot = React.lazy(() => import('react-plotly.js'));


function SellCommodCompare(props) {
  const [graphData] = useState({})

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
          },
          {
            x: [props.currentStation.commodities[thisMarket].sellPrice],
            y: [props.currentStation.commodities[thisMarket].demand],
            type: 'scatter',
            mode: 'markers',
            marker: {
              color: '#66adee',
              symbol: 'x',
              size: 10,
            },
            // text: zData,
            // hoverformat: '~s',
            // hovertemplate: 'Station name: %{text[0]} <br>'  + 'System name: %{text[1]} <br>',
          },
        ],

        graphData.layout = {
          title: `Stations buying ${title} around the galaxy:`,
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
          bargap: 0,
          xaxis: {
            // domain: [0, 0.85],
            // showgrid: false,
            // zeroline: false,
            type: 'log',
            title: 'price per unit',
            color: '#66adee'
          },
          yaxis: {
            // domain: [0, 0.85],
            // showgrid: false,
            // zeroline: false,
            type: 'log',
            title: 'total demand',
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

export default SellCommodCompare