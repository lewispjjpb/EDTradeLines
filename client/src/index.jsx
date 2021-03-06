import React, {Suspense} from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import BuyGraph from './bGraph.jsx';
import SellGraph from './sGraph.jsx';
import AllStations from './allStations.tsx';
import SellCommodCompare from './sCommodDist.jsx';
import BuyCommodCompare from './bCommodDist.jsx';


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
      commodS: 'Click on a commodity above for more information (please be patient)',
      commodB: '',
    }
    this.getStation = this.getStation.bind(this);
    this.populateStationList = this.populateStationList.bind(this);
    this.setStation = this.setStation.bind(this);
    this.getNewStation = this.getNewStation.bind(this);
    this.getCommodityDetails = this.getCommodityDetails.bind(this);
  }

  statList = [];

  componentDidMount() {
    this.getStation('Jameson Memorial');
    this.populateStationList();
  }

  getStation(stationName) {
    axios.get(`/market/${stationName}`)
      .then(response => this.setState({'currentStation': response.data[0]}))
      .catch(err => console.log(err))
  }

  populateStationList() {
    axios.get('/stations')
      .then (response => {
        this.setState({stationList: response.data});
        this.statList = response.data;
      })
      .catch(err => console.log(err))
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
    let name = this.state.queueStation;
    this.getStation(name);
  }

  getCommodityDetails(commodity) {
    const numStations = this.state.stationList.length;
    this.setState({
      commodS: `Crawling ${numStations} markets with a very tiny hamster...`,
      commodB: `Crawling ${numStations} markets with a very tiny hamster...`
    });
    axios.get(`/commoditiesS/${commodity}`)
      .then(response => {
        this.setState({commodS: response.data});
      })
      .catch(err => console.log(err))
    axios.get(`/commoditiesB/${commodity}`)
      .then(response => {
        this.setState({commodB: response.data});
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
          <SellGraph data={this.state.currentStation} getCommodityDetails={this.getCommodityDetails}/>
          <BuyGraph data={this.state.currentStation} getCommodityDetails={this.getCommodityDetails}/>
        </div>
        <div className="main2">
          <SellCommodCompare data={this.state.commodS} currentStation={this.state.currentStation}/>
          <BuyCommodCompare data={this.state.commodB} currentStation={this.state.currentStation}/>
        </div>

        <div className="footer">
          Hey!  I'm looking for work as a developer!  Check out my <a href="https://www.linkedin.com/in/patrick-lewis-ms-pmp-34aaa254/" color="white">LinkedIn</a> and <a href="https://github.com/lewispjjpb"> GitHub</a> profiles!
        </div>
          <div className="footer2">ED TradeLines is not endorsed by or affiliated with Frontier Developments. | Charts by Plotly</div>
      </div>
    )
  }
}

export default Main;
