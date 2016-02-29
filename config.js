'use strict';

let config = {
  development: {
    logFormat: 'dev',
    port: 3000,
    dynamoTableName: 'cubing-production'
  },
  production: {
    logFormat: 'combined',
    port: process.env.PORT,
    dynamoTableName: 'cubing-production'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
