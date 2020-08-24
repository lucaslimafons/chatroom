# Jobsity Chatroom

### Technologies
> Nodejs v12, MySQL, Kafka

### Steps

1. First of all run
```
$ npm install
```

2. Create an environment file (you can use the .env.dev to run locally or .env.prod to use aws rds database)
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

7. Run the project
```
npm start
```

8. Test command
```
npm run test
```

That's it!

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
- [] Have more than one chatroom.
- [] Unit test the functionality you prefer.
- [x] Handle messages that are not understood or any exceptions raised within the bot.
