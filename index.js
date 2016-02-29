'use strict';

const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');
const handlers = require('./handlers');

let app = express();

app.use(helmet());
app.use(methodOverride());
app.use(cors());
app.use(morgan(config.logFormat));
app.use(bodyParser.json());

app.get('/solves/:puzzle', handlers.getSolves);
app.post('/solves', handlers.authorize, handlers.syncSolves);

app.use((err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }
  let status = err.status || 500;
  if(status >= 500) {
    console.error(err.stack);
  }
  res.status(status).send({ message: err.message || 'Something went wrong.' });
});

app.use((req, res, next) => {
  res.status(404).send({
    url: req.url,
    message: 'Not found.'
  })
});

let server = app.listen(config.port, () => {
  console.log('Server running on port', server.address().port);
});
