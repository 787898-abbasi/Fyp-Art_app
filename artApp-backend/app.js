//requiring all models from model folder
require('./models/artist');
require('./models/category');
require('./models/product');
require('./models/order');
require('./models/buyer');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv/config');

// routers import
const artistRouter = require('./routers/artist');
const categoryRouter = require('./routers/category');
const productRouter = require('./routers/product');
const orderRouter = require('./routers/order');
const buyerRouter = require('./routers/buyer');

//any middle wares here
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//using routers
const api = process.env.API_URL;
console.log('here');
app.use(`${api}/artist`, artistRouter);

app.use(`${api}/category`, categoryRouter);
app.use(`${api}/product`, productRouter);
app.use(`${api}/order`, orderRouter);
app.use(`${api}/buyer`, buyerRouter);

//conneting to mongoDB database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: 'ArtGallery',
  })
  .then(() => {
    console.log('mongoDB is ready');
  })
  .catch((err) => {
    console.log(err.message);
  });

//listening to the port
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
