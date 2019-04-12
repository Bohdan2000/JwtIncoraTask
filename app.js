const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config/config');
const app = express();

// routes
const userRoute = require('./app/routes/users')
const productRoute = require('./app/routes/products')
const authRoute = require('./app/routes/auth')
// "mongodb://localhost:27017/usersdb"

const host = config.database.connection.host;
const port = config.database.connection.port;
const dbName = config.database.connection.database;
const client = config.database.client;
const database = `${client}://${host}:${port}/${dbName}`;
mongoose.connect(database, {useNewUrlParser: true} , (err) => {
    if (err) console.log(err);
})

app
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json());

app
  .use('/auth', authRoute)
  .use('/users', userRoute)
  .use('/products',productRoute);

app.listen(config.api.port, () => {
  console.log('*** Server Started ***');
});