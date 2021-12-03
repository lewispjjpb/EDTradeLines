const zlib = require('zlib');
const zmq = require('zeromq');

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';

async function stuff(callback) {
  // console.log(zmq)
  const sock = zmq.socket("sub");

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  console.log('EDDN listener connected to:', SOURCE_URL);

  sock.on("message", function(topic, message) {
    const msg = JSON.parse(zlib.inflateSync(topic))
    // console.log(
    //   "received a message related to:",
    //   msg.message,
    //   "containing schema:",
    //   msg.$schemaRef
    // );
    callback(msg.message);
    // return msg.message
  });
}

module.exports.stuff = stuff;

// run();,,