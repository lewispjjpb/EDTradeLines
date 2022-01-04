const zlib = require('zlib');
const zmq = require('zeromq');
const model = require('../database/mongoschema.js')

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';

async function feedMe() {
  const sock = zmq.socket("sub");

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  console.log('EDDN listener connected to:', SOURCE_URL);

  sock.on("message", function(topic, message) {
    const msg = JSON.parse(zlib.inflateSync(topic))
    let reName = /([A-Z\d]){3}-[A-Z\d]{3}/;
    if (msg.$schemaRef === 'https://eddn.edcd.io/schemas/commodity/3') {
      console.log(
        "Received station update:",
        msg.message.stationName,
        );
        if (!reName.test(msg.message.stationName)) {
          model.makeStation(msg.message);
        }
    }
  });
}

module.exports.feedMe = feedMe;

// feedMe();
