const { model } = require('./../../src/buildings');

const baseUrl = `${process.env.HOST}:${process.env.PORT}/`;

this.integration = {
  baseUrl,
};


describe('Integration Test', () => {
  before(() => {
    module.exports = this.integration;
  });

  require('./buildings.spec');

  after(() => {
    this.integration.buildings = require('./buildings.spec');
    return model.deleteMany({});
  });
});
