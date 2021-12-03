const zlib = require('zlib');
const zmq = require('zeromq');

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';

async function stuff() {
  // console.log(zmq)
  const sock = zmq.socket("sub");

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  console.log('EDDN listener connected to:', SOURCE_URL);

  sock.on("message", function(topic, message) {
    const msg = JSON.parse(zlib.inflateSync(topic))
    if (msg.$schemaRef === 'https://eddn.edcd.io/schemas/commodity/3') {
      console.log(
        "received a message related to:",
        // msg.message,
        "containing schema:",
        msg.header
      );
      return msg.message;
      // break;
    }
  });
}

module.exports.stuff = stuff;

// stuff();