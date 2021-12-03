const mongoose = require('mongoose')
const fs = require('fs');
// const zlib = require('zlib')
var sample = require('./sample.json');
const JSONStream = require('JSONStream');
const split = require('split')

// line = sample['message']
// console.log(sample['commodities'])

mongoose.connect('mongodb://localhost:27017/market');


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

const makeStation = (line) => {
  // console.log(line)
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


  const data = new marketModel(station)
  data.save()
}

const marketModel = mongoose.model('marketData', marketSchema);
// makeStation(line)

// var populate = () => {  //function for seeding
//   var stream = fs.createReadStream('')
//     .pipe(split())
//     .on('data', function(line) {
//       const parsed = JSON.parse(line)

//       makeStation(parsed.message)
//     })
// }
// populate() //database make switch


module.exports = {
  getMarket: function(stationId) {
    const answer = marketModel.find({"stationId": stationId});
    return answer;
  },

  getStations: function() {
    const answer = marketModel.find();

    return answer;
  }
}
