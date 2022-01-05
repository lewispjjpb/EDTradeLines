const mongoose = require('mongoose')
const fs = require('fs');
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

const marketAverage = new mongoose.Schema ({
  name: String,
  history: {
    date: Date,
    avgPrice: Number,
    status: [String]
  }
})


const makeStation = (line) => {
  var station = {
    stationName: line['stationName'],
    stationId: line['marketId'],
    date: line['timestamp'],
    systemName: line['systemName'],
    commodities: []
  };

  var averageData = [];

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

    const convertedDate = new Date(line.timestamp)
    averageData.push({
      name: line.commodities[i].name,
      history: {
        date: convertedDate,
        avgPrice: line.commodities[i].meanPrice,
        status: line.commodities[i].statusFlags
      }
    })

  }
  // console.log(averageData)////

  // var populate = () => {  //function for seeding
  //   var stream = fs.createReadStream('database/decData.json')
  //     .pipe(split())
  //     .on('data', function(line) {
  //       const parsed = JSON.parse(line)

  //       makeStation(parsed.message)
  //     })
  // }
  // populate() //database make switch

  const findStationAndUpdate = (data, market) => {
    const query = {'stationId': (data.stationId).toString()}
    console.log('making: ', query)
    marketModel.findOneAndUpdate(query, data, {'upsert': true, useFindAndModify: false}, function(err, doc) {
      if (err) return {error: err};
      return (`${data.stationName} saved.`);
    })

    for (var i = 0; i < market.length; i++) {
      // const avgPriceQuery = {'name': market[i].name}
      const data = new avgModel(market[i])
      data.save()
    }
  }



  findStationAndUpdate(station, averageData)
}

const marketModel = mongoose.model('marketData', marketSchema);
const avgModel = mongoose.model('averagePrice', marketAverage);



module.exports = {
  getMarket: function(name) {
    const answer = marketModel.find({"stationName": name});
    return answer;
  },

  getStations: function() {
    const answer = marketModel.find(null, {"stationId":1, "stationName":1, "date":1, "_id":0  }).hint({ stationId: 1}).lean();
    return answer;
  },

  makeStation: makeStation,

  getCommodityS: function(commodity) {
    const answer = marketModel.find( {$and: [
      { 'commodities': {'$elemMatch': {'name': commodity , 'demand': {$gt:1}} } } ] }).select(
        {'stationName': 1, 'commodities.sellPrice.$': 1, 'commodities.name': 1, 'systemName':1, 'commodities.demand':1, '_id': 0}
      ).lean();
    return answer;
  },

  getCommodityB: function(commodity) {
    const answer = marketModel.find( {$and: [
      { 'commodities': {'$elemMatch': {'name': commodity , 'stock': {$gt:1}} } } ] },
      {'stationName': 1, 'commodities.buyPrice.$': 1, 'commodities.name': 1, 'systemName':1, 'commodities.stock':1, '_id': 0}).lean();
    return answer;
  },

  getCommodAvg: function(commodity) {
    const answer = avgModel.find({'name': commodity});
    return answer
  }

}


// getCommodityS: function(commodity) {
//   const answer = marketModel.find( {$and: [
//     { 'commodities': {'$elemMatch': {'name': commodity , 'demand': {$gt:1}} } } ] },
//     {'stationName': 1, 'commodities.sellPrice.$': 1, 'commodities.name': 1, 'systemName':1, 'commodities.demand':1, '_id': 0}).lean();
//   return answer;
// },