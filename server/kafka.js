const kafka = require('kafka-node');

try {
  const client = new kafka.KafkaClient(process.env.KAFKA_SERVER);
  const topics = [
    {
      topic: process.env.KAFKA_TOPIC_PARSE,
      partitions: 1,
      replicationFactor: 1
    },
    {
      topic: process.env.KAFKA_TOPIC_RESULT,
      partitions: 1,
      replicationFactor: 1
    }
  ];

  console.log('Creating topics');
  client.createTopics(topics, (error, result) => {
    if (error) {
      console.log('Creating topics error: ')
      console.log(error);
    } else {
      console.log('Creating topics result: ')
      console.log(result);
    }
  });
} catch (e) {
  console.log(e);
}
