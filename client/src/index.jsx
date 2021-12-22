import React, {Suspense} from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import BuyGraph from './buyGraph.jsx';
import SellGraph from './sellGraph.jsx';
import AllStations from './allStations.jsx'


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStation: {},
      stationList: [],
      activeSuggestion: 0,
      filtered: [],
      showSuggestions: false,
      queueStation: '',
      commod: null
    }
    this.getStation = this.getStation.bind(this);
    this.populateStationList = this.populateStationList.bind(this);
    this.setStation = this.setStation.bind(this);
    this.getNewStation = this.getNewStation.bind(this);
    this.getCommodityDetails = this.getCommodityDetails.bind(this)
  }

  statList = [];

  componentDidMount() {
    this.getStation('Jameson Memorial');
    this.populateStationList();
  }

  getStation(stationName) {
    axios.get(`/market/${stationName}`)
      .then(response => this.setState({'currentStation': response.data[0]}))
      .then(console.log('station loaded'))
      .catch('error in getStation?')
  }

  populateStationList() {
    axios.get('/stations')
      .then (response => {
        console.log('headers: ', response.headers)
        this.setState({stationList: response.data})
        this.statList = response.data
        console.log('set statList')
      })
  }

  setStation(e) {
    e.preventDefault();
    const userInput = e.target.value;
    const filtered = this.statList.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )
    this.setState({
      activeSuggestion: 0,
      filtered,
      showSuggestions: true,
      queueStation: e.target.value
    })
  }

  selectStationFromList(e) {
    this.setState({
      activeSuggestion: 0,
      filtered: [],
      showSuggestions: false,
      queueStation: e.currentTarget.innerText
    });
  }


  getNewStation(e) {
    e.preventDefault();
    let name = this.state.queueStation
    this.getStation(name)
  }

  getCommodityDetails(commodity) {
    axios.get(`/commodities/${commodity}`)
      .then(response => {
        this.setState({commod: response.data})
      })
      .catch(err => console.log(err))
  }

  render() {
    const filterStations = function(array, query) {
      return array.filter(function(station) {
        return station.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
    }

    return (
      <div className="container">
        <div className="header">
          <div>Current station: <b>{this.state.currentStation.stationName}   </b>
              --- Market data age: {format(this.state.currentStation.date)} </div>
              <AllStations statList={this.state.stationList} getStation={this.getStation} />
          </div>

        <div className="main">
          <div><BuyGraph data={this.state.currentStation} getCommodityDetails={this.getCommodityDetails}/></div>
          <div><SellGraph data={this.state.currentStation} getCommodityDetails={this.getCommodityDetails}/></div>
        </div>
        <div className="footer">
          <em>Hey!  I'm looking for work as a developer!  Check out my <a href="https://www.linkedin.com/in/patrick-lewis-ms-pmp-34aaa254/" color="white">LinkedIn</a> and <a href="https://github.com/lewispjjpb"> GitHub</a> profiles!</em>
          <div style={{color: 'dimgrey',}}>ED TradeLines is not endorsed by or affiliated with Frontier Developments. | Charts by Plotly</div>
        </div>
      </div>
    )
  }
}

export default Main
