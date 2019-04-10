const chai = require('chai');
const http = require('chai-http');

chai.use(http);
this.tmp = {};

before(() => {
  this.integration = require('./index.spec');
});

it('should success create data buildings', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('buildings')
    .send({
      name: 'office 01',
      type: 'office',
      description: 'best place for work',
      facilities: ['meeting room', 'parkir area', 'security'],
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZgrXss7nmPFIumZYpm1xgp2XQiBj0Ge1xuONH0tqwDvpOmCM2Q',
        'https://www.realestate.com.au/blog/images/1885x1414-fit,progressive/2018/02/26012408/investing-property-with-superannuation_2000x1500.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWEQ9LRkaQgu0ZN1X4zKf8xwQD44cmnEj0g2AFuPOS30zCIO7Ivg',
      'http://blog.upasnagroup.com/wp-content/uploads/2018/08/1-2-bhk-flat-on-rent-resale-chinchwad-link-road-chinchwad-gaon.jpg'],
      address: {
        streets: 'jl sadar 2',
        city: 'jakarta pusat',
        country: 'Indonesia',
        longitude: 106.606235,
        latitude: -6.213463,
      },
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(201);
  this.tmp.createData = action.body.data;
});

it('should success get data buildings', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .get('buildings')
    .query({
      page: 1,
      limit: 15,
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
});

it('should success get data buildings search', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .get('buildings')
    .query({
      page: 1,
      limit: 15,
      name: 'office',
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  chai.expect(action.body.data.totalDocs > 0).to.be.equal(true);
});

it('should failed get data buildings search by name', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .get('buildings')
    .query({
      page: 1,
      limit: 15,
      name: 'aaaa',
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  chai.expect(action.body.data.totalDocs > 0).to.be.equal(false);
});

it('should get data buildings by id', async () => {

  const action = await chai.request(this.integration.baseUrl)
    .get(`buildings/${this.tmp.createData.id}`);


  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
});

it('should success update data by id', async () => {
  const dummy = {
    name: 'change name',
  };

  await chai.request(this.integration.baseUrl)
    .put(`buildings/${this.tmp.createData.id}`)
    .send(dummy);

  const data = await chai.request(this.integration.baseUrl)
    .get(`buildings/${this.tmp.createData.id}`)
    .then(res => res.body.data);

  chai.expect(data.name).to.be.equal(dummy.name);
});

it('should success delete data by id', async () => {
  const dummy = {
    name: 'change name',
  };

  await chai.request(this.integration.baseUrl)
    .delete(`buildings/${this.tmp.createData.id}`)

  const data = await chai.request(this.integration.baseUrl)
    .get(`buildings/${this.tmp.createData.id}`)

  chai.expect(data.status).to.be.equal(204);
});

after(() => {
  module.exports = this.tmp;
})
