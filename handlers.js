'use strict';

const AWS = require('aws-sdk');
AWS.config.loadFromPath('./credentials.json');
let dynamodb = new AWS.DynamoDB.DocumentClient();

const config = require('./config');

exports.authorize = (req, res, next) => {
  if(req.headers.authorization !== config.authenticationToken) {
    return next({ status: 401, message: 'Must provide a valid authentication token' });
  }
  next();
};

exports.getSolves = (req, res, next) => {
  if(!req.params.puzzle) {
    return next({ status: 400, message: 'No puzzle name given' });
  }
  let params = {
    TableName: config.dynamoTableName,
    KeyConditionExpression: 'puzzle = :puzzle',
    ProjectionExpression: '#solvetime, recorded_at',
    ExpressionAttributeValues: {
      ':puzzle': req.params.puzzle,
    },
    ExpressionAttributeNames: {
      '#solvetime': 'duration'
    }
  };
  if(req.query.since) {
    let timestamp = new Date(Number(req.query.since)).getTime();
    if(isNaN(timestamp)) {
      return next({ status: 400, message: 'Invalid since timestamp' });
    }
    params.KeyConditionExpression += ' AND recorded_at >= :since';
    params.ExpressionAttributeValues[':since'] = timestamp;
  }
  dynamodb.query(params, (err, data) => {
    if(err) {
      return next(err);
    }
    res.send({ puzzle: req.params.puzzle, count: data.Count, solves: data.Items });
  });
};

exports.syncSolves = (req, res, next) => {
  if(!req.body.solves || !Array.isArray(req.body.solves) || req.body.solves.length === 0) {
    return next({ status: 400, message: 'Must give an array of at least one solve' });
  }
  for(let i = 0; i < req.body.solves.length; i++) {
    let solve = req.body.solves[i];
    if(!solve.puzzle || !solve.duration || !solve.recorded_at) {
      return next({
        status: 400,
        message: 'All solves must specify puzzle, duration, and recorded_at'
      });
    }
  }
  req.body.solves.forEach((solve, i, solves) => {
    solves[i] = {
      PutRequest: {
        Item: {
          puzzle: solve.puzzle,
          duration: solve.duration,
          recorded_at: solve.recorded_at
        }
      }
    };
  });
  let params = {
    RequestItems: {
      [config.dynamoTableName]: req.body.solves
    }
  };
  dynamodb.batchWrite(params, (err, data) => {
    if(err) {
      err.status = err.status || 400;
      return next(err);
    }
    data.message = `Added ${req.body.solves.length} solves`;
    res.send(data);
  });
};
