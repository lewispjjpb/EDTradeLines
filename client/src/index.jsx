import React from 'react';
import axios from 'axios'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStation: {},
      stationList: []
    }
    this.getStation = this.getStation.bind(this)
  }

  componentDidMount() {
    this.getStation();
  }

  getStation() {
    axios.get('/market/3223925504')
      .then(response => this.setState({'currentStation': response.data}))
      .then(console.log('station loaded'))
      .catch('error?')
  }

  render() {
    return (
    <div>hello react component world</div>
    )
  }
}

export default Main