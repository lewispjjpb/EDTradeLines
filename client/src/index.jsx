import React, {Suspense} from 'react';
import axios from 'axios';
import BuyGraph from './buyGraph.jsx';
import SellGraph from './sellGraph.jsx';
import { format } from 'timeago.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStation: {},
      stationList: [],
      queueStation: ''
    }
    this.getStation = this.getStation.bind(this);
    this.populateStationList = this.populateStationList.bind(this);
    this.setStation = this.setStation.bind(this);
    this.updateStation = this.updateStation.bind(this);
  }

  componentDidMount() {
    this.getStation('Abernathy City');
    this.populateStationList();
  }

  getStation(stationId) {
    axios.get(`/market/${stationId}`)
      .then(response => this.setState({'currentStation': response.data[0]}))
      .then(console.log('station loaded'))
      .catch('error in getStation?')
  }

  populateStationList() {
    axios.get('/stations')
      .then (response => {
        console.log('headers: ', response.headers)
        this.setState({stationList: response.data})
      })
  }

  setStation(e) {
    e.preventDefault();
    this.setState({queueStation: e.target.value})
  }

  updateStation(e) {
    e.preventDefault();
    let name = [this.state.queueStation]
    this.getStation(name)
  }

  render() {
    const simpleList = this.state.stationList
    console.log('numstations: ', simpleList.length)
    const filterStations = function(array, query) {
      return array.filter(function(station) {
        return station.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
    }
    return (
      <div className="container">
        <div className="header">
          <div>Current station: <b>{this.state.currentStation.stationName}   </b>
              ||| Market data age: {format(this.state.currentStation.date)} </div>
          <form onSubmit={this.updateStation}>
            <label>
              Select station:
              </label>
              <input
              type="text"
              name="search"
              id="selection"
              value={this.state.queueStation}
              placeholder="Type station name..."
              onChange={this.setStation}

              />
              {/* {filterStations(simpleList, this.state.queueStation)} */}
              {/* <script id="selectscript">{
                function chooseStation() {
                  console.log('y7ou are here')
                  var station, filter, stationList, txtVal, a;
                  station = this.state.queueStation;
                  filter = station.toLowerCase();
                  section = document.getElementById('selection')
                  stationList = this.state.stationList;
                  for (var i = 0; i < stationList.length; i++) {
                    let a = stationList[i];
                    txtVal = this.state.queueStation;
                    if (txtVal.toLowerCase().indexOf(filter) > -1) {
                      console.log(stationList[i]);
                    }
                  }
                }
              }words</script> */}

            <input type="submit" value="Get station data" className="get"/>
          </form>
        </div>

        <div className="main">
          <div><BuyGraph data={this.state.currentStation}/></div>
          <div><SellGraph data={this.state.currentStation}/></div>
        </div>

        <div className="footer">
          <em>Hey!  I'm looking for work as a developer!  Check out my <a href="https://www.linkedin.com/in/patrick-lewis-ms-pmp-34aaa254/" color="white">LinkedIn</a> and <a href="https://github.com/lewispjjpb"> GitHub</a> profiles!</em>
        </div>

      </div>
    )
  }
}

export default Main