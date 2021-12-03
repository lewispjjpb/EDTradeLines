const mongoose = require('mongoose')
var sample = require('./sample.json')

sample = sample['message']
// console.log(sample['commodities'])

mongoose.connect('mongodb://localhost:27017/market')


// main().catch(err => console.log(err))
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


var station = {
  stationName: sample['stationName'],
  stationId: sample['marketId'],
  date: sample['timestamp'],
  systemName: sample['systemName'],
  commodities: []
}
for (var i = 0; i < sample['commodities'].length; i++) {
  let thisCommodity = {
    buyPrice: sample['commodities'][i]['buyPrice'],
    demand: sample['commodities'][i]['demand'],
    demandBracket: sample['commodities'][i]['demandBracket'],
    meanPrice: sample['commodities'][i]['meanPrice'],
    name: sample['commodities'][i]['name'],
    sellPrice: sample['commodities'][i]['sellPrice'],
    statusFlags: sample['commodities'][i]['statusFlags'],
    stock: sample['commodities'][i]['stock'],
    stockBracket: sample['commodities'][i]['stockBracket']
  }
  station['commodities'].push(thisCommodity)
}

const marketModel = mongoose.model('marketData', marketSchema);

const data = new marketModel(station)

// data.save()


module.exports = {
  getMarket: function() {
    const answer = marketModel.find();
    return answer;
  }
}
