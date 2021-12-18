const mongoose = require('mongoose')
const fs = require('fs');
var sample = require('./sample.json');
const JSONStream = require('JSONStream');
const split = require('split')


mongoose.connect('mongodb://localhost:27017/market');

const commodSchema = new mongoose.Schema(
  {
    buyPrice: Number,
    demand: Number,
    demandBracket: Number,
    meanPrice: Number,
    name: String,
    sellPrice: Number,
    statusFlags: [String],
    stock: Number,
    stockBracket: Number
  }
)

const marketSchema = new mongoose.Schema ({
  stationName: String,
  stationId: Number,
  date: Date,
  systemName: String,
  commodities: [commodSchema]
})

const makeStation = (line) => {
  var station = {
    stationName: line['stationName'],
    stationId: line['marketId'],
    date: line['timestamp'],
    systemName: line['systemName'],
    commodities: []
  }
  for (var i = 0; i < line['commodities'].length; i++) {
    let thisCommodity = {
      buyPrice: line['commodities'][i]['buyPrice'],
      demand: line['commodities'][i]['demand'],
      demandBracket: line['commodities'][i]['demandBracket'],
      meanPrice: line['commodities'][i]['meanPrice'],
      name: line['commodities'][i]['name'],
      sellPrice: line['commodities'][i]['sellPrice'],
      statusFlags: line['commodities'][i]['statusFlags'],
      stock: line['commodities'][i]['stock'],
      stockBracket: line['commodities'][i]['stockBracket']
    }
    station['commodities'].push(thisCommodity)
  }


  const findStationAndUpdate = (data) => {
    const query = {'stationId': (data.stationId).toString()}
    console.log('making: ', query)
    marketModel.findOneAndUpdate(query, data, {'upsert': true, useFindAndModify: false}, function(err, doc) {
      if (err) return {error: err};
      return (`${data.stationName} saved.`);
    })
  }
  findStationAndUpdate(station)

}

const marketModel = mongoose.model('marketData', marketSchema);



module.exports = {
  getMarket: function(stationId) {
    const answer = marketModel.find({"stationId": stationId});
    return answer;
  },

  getStations: function() {
    const answer = marketModel.find(null, {"stationId":1, "stationName":1, "date":1, "_id":0  }).hint({ stationId: 1}).lean();
    return answer;
  },

  makeStation: makeStation
}
