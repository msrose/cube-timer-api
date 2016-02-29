'use strict';

let secret = require('./secret.json');

let config = {
  development: {
    logFormat: 'dev',
    port: 3000,
    dynamoTableName: 'cubing-production',
    authenticationToken: 'suchagoodtoken'
  },
  production: {
    logFormat: 'combined',
    port: process.env.PORT,
    dynamoTableName: 'cubing-production',
    authenticationToken: secret.authenticationToken
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
