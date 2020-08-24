const kafka = require('kafka-node');
let producer = null;

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient(process.env.KAFKA_SERVER);
  producer = new Producer(client);

  producer.on('ready', async function() {
    //We could make something here :)
  });

  producer.on('error', function(err) {
    console.log('[kafka-producer]: connection errored');
    console.log(err);
    throw err;
  });
} catch(e) {
  console.log(e);
}

module.exports = producer;
