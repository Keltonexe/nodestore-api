'use strict';
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

/* Conecta ao banco */
mongoose.connect(config.connectionString,
    {/* Remove all 'DeprecationWarning' */
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    }
);

/* Carrega os Models */
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

/* Carrega as Rotas */
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* How to resolve CORS Error: The request has been blocked because of the CORS policy */
app.use(cors());

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;