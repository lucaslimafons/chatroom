# Jobsity Chatroom

### Technologies
> Nodejs v12, MySQL, Kafka

You need to run Chatroom Stock too!
[Click here](https://github.com/lucaslimafons/chatroom-stock)

### Steps

1. First of all run
```
$ npm install
```

2. Create an environment file named .env and if you want to run on your local database then copy the content from .env.dev or if you don't then copy the content from .env.prod
> If you would like to use your local database you must follow the step 3, if you wouldn't then go to step 4

3. To create the database you should run the follow command with the environment variable:
```
$ npm run migrate $1
```
Example:
```
$ npm run migrate development
```

(Please take a look on config/database.js file.)

4. I'm using Kafka for the message broker so you need to install/configure and run to work, I follow this link [Kafka Installation on Mac](https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273)

5. Start zookeeper server
```
$ npm run zookeeper
```

6. Start kafka server
```
$ npm run kafka
```

7. Create topics
```
$ kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic parse_stock_quote

$ kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic result_stock_quote
```

8. Run the project
```
$ npm start
```

9. Test command
```
$ npm run test
```

That's it!

If you want you can build the css file running
```
$ node-sass assets/scss/index.scss public/stylesheets/index.css -w
```

### Mandatory
- [x] Allow registered users to log in and talk with other users in a chatroom.
- [x] Allow users to post messages as commands into the chatroom with the following format
/stock=stock_code
- [x] Create a decoupled bot that will call an API using the stock_code as a parameter
(https://stooq.com/q/l/?s=aapl.us&f=sd2t2ohlcv&h&e=csv, here aapl.us is the
stock_code)
- [x] The bot should parse the received CSV file and then it should send a message back into
the chatroom using a message broker like RabbitMQ. The message will be a stock quote
using the following format: “APPL.US quote is $93.42 per share”. The post owner will be
the bot.
- [x] Have the chat messages ordered by their timestamps and show only the last 50
messages.

### Optional
- [] Have more than one chatroom. (Could not start this one, I need to sleep :( haha)
- [x] Unit test the functionality you prefer.
- [x] Handle messages that are not understood or any exceptions raised within the bot.
