const Boom = require('boom');

const { route: buildings } = require('./../buildings');

const routes = [];

module.exports = routes.concat(buildings);
