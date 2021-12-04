import React from 'react';
import d3 from 'd3';
import {select} from "d3-selection";
import ReactDOM from 'react-dom'

const jsdom = new JSDOM(html);
const svg = select(jsdom.window.document.body).append("svg");

///
function SellGraph(props) {

  chart = LineChart(asdf, {
    x: d => d.date,
    y: d => d.close,
    yLabel: "↑ Daily close ($)",
    width,
    height: 500,
    color: "steelblue"
  })
  return <div id="sellgraph">a graph</div>
}


export default SellGraph