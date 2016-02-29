'use strict';

let config = {
  development: {
    logFormat: 'dev',
    port: 3000
  },
  production: {
    logFormat: 'combined',
    port: process.env.PORT
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
