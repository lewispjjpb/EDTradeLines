import React from 'react';
import axios from 'axios';
import BuyGraph from './buyGraph.jsx'
import SellGraph from './sellGraph.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStation: {},
      stationList: {},
      queueStation: ''
    }
    this.getStation = this.getStation.bind(this);
    this.populationStationList = this.populationStationList.bind(this);
    this.setStation = this.setStation.bind(this);
    this.updateStation = this.updateStation.bind(this);
  }

  componentDidMount() {
    this.getStation(3223925504);
    this.populationStationList();
  }

  getStation(stationId) {
    axios.get(`/market/${stationId}`)
      .then(response => this.setState({'currentStation': response.data[0]}))
      .then(console.log('station loaded'))
      .catch('error in getStation?')
  }

  populationStationList() {
    axios.get('/stations')
      .then (response => this.setState({stationList: response.data}))
  }

  setStation(e) {
    e.preventDefault();
    this.setState({queueStation: e.target.value})
  }

  updateStation(e) {
    e.preventDefault();
    console.log(this.state.stationList[this.state.queueStation])
    let id = this.state.stationList[this.state.queueStation]['stationId']
    // console.log(id)
    this.getStation(id)
  }

  render() {
    const simpleList = Object.keys(this.state.stationList).sort()
    return (
      <div className="container">
        <div className="header">
          <div>Current station: {this.state.currentStation.stationName}</div>
          <form onSubmit={this.updateStation} className="header">
            <label>
              Select station:
              <select type="text" value={this.state.queueStation} onChange={this.setStation}>
                {simpleList.map(item => <option value={item}>{item}</option>)}
              </select>
            </label>
            <input type="submit" value="Get station data"/>
          </form>
        </div>

        <div className="main">
          <div><BuyGraph data={this.state.currentStation}/></div>
          <div><SellGraph data={this.state.currentStation}/></div>
        </div>

        <div className="footer">
          Hey!  I'm looking for work as a software developer!  Check out my <a href="https://www.linkedin.com/in/patrick-lewis-ms-pmp-34aaa254/">LinkedIn profile</a>.
        </div>

      </div>
    )
  }
}

export default Main