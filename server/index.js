const express = require('express')
const zmq = require('./zeroindex.js')
const path = require('path')
const db = require('../database/mongoschema.js');
const gzip = require('gzip');
const compression = require('compression');
const serverTiming  = require('server-timing');

const app = express()
const port = 3001



app.use(serverTiming ());
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));

var allStations = {}


app.get('/market/:stationId', (req, res) => {
  let start = Date.now();
  console.log(req.params)
  const stationId = req.params.stationId
  db.getMarket(stationId)
    .then(results => {
      res.setMetric('db', (Date.now() - start), 'getting db');
      res.status(200).send(results)
    })
    .catch(err => res.status(500).send(err))
})

app.get('/stations', (req, res) => {
  let start = Date.now();
  console.log('getting all stations')
  res.setMetric('rec', (Date.now() - start), 'm. received');
  db.getStations()
    .then(results => {
      res.setMetric('db', (Date.now() - start), 'getting db');
      console.log('waited for: ', (Date.now() - start))
      start = Date.now();
      let stationSum = {};
      for (let i = 0; i < results.length; i++) {
        let stationInfo = {};
        let oneStation = results[i]
        stationInfo['stationId'] = oneStation['stationId'];
        stationInfo['date'] = oneStation['date'];
        stationInfo['system'] = oneStation['systemName']
        stationSum[oneStation['stationName']] = stationInfo
      };
      res.setMetric('server', (Date.now() - start), 'arr build');
      return stationSum
    })
    .then(stations => {
      allStations = stations
      res.status(200).send(Object.keys(stations).sort())
    })
    .catch(err => res.status(500).send(err))
})

app.get('/commodities/:commod', (req, res) => {
  const commod = req.params.commodity
})


app.listen(port, () => {
  console.log(`EDTradelines listening at http://localhost:${port}`)
})
