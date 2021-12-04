import React from 'react';
import axios from 'axios';
import BuyGraph from './buyGraph.jsx'
import SellGraph from './sellGraph.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStation: {},
      stationList: []
    }
    this.getStation = this.getStation.bind(this);
    this.populationStationList = this.populationStationList.bind(this)
  }

  componentDidMount() {
    this.getStation();
    // this.populationStationList();
  }

  getStation() {
    axios.get('/market/3223925504')
      .then(response => this.setState({'currentStation': response.data[0]}))
      .then(console.log('station loaded'))
      .catch('error?')
  }

  populationStationList() {
    axios.get('/stations')
      .then (response => this.setState({stationList: response.data}))
  }

  render() {
    return (
      <div>
        <div>{this.state.currentStation.stationName}</div>
        <div><BuyGraph data={this.state.currentStation}/></div>
        <div><SellGraph data={this.state.currentStation}/></div>
      </div>
    )
  }
}

export default Main