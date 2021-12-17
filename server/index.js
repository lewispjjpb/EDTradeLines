const express = require('express')
const zmq = require('./zeroindex.js')
const path = require('path')
const db = require('../database/mongoschema.js');
const gzip = require('gzip');
const compression = require('compression');

const app = express()
const port = 3001







app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));


app.get('/market/:stationId', (req, res) => {
  console.log(req.params)
  const stationId = req.params.stationId
  db.getMarket(stationId)
    .then(results => {res.status(200).send(results)})
    .catch(err => res.status(500).send(err))
})

app.post('/newstation', (req, res) => {

})

app.get('/stations', (req, res) => {
  console.log('getting all stations')
  db.getStations()
    .then(results => {
      console.log(typeof(results))
      let stationSum = {};
      for (let i = 0; i < results.length; i++) {
        let stationInfo = {};
        let oneStation = results[i]
        stationInfo['stationId'] = oneStation['stationId'];
        stationInfo['date'] = oneStation['date'];
        stationInfo['system'] = oneStation['systemName']
        stationSum[oneStation['stationName']] = stationInfo
      };
      // console.log(stationSum)
      return stationSum
    })
    .then(stations => {
      console.log('file size: ', stations.size)
      res.status(200).send(stations)})
    .catch(err => res.status(500).send(err))
})

app.listen(port, () => {
  console.log(`EDTradelines listening at http://localhost:${port}`)
})
