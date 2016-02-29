'use strict';

const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');

let app = express();

app.use(helmet());
app.use(methodOverride());
app.use(cors());
app.use(morgan(config.logFormat));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send({ message: 'Here we are!' });
});

var server = app.listen(config.port, () => {
  console.log('Server running on port', server.address().port);
});
