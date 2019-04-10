const controlller = require('./controller');

module.exports = [
  // create data
  {
    method: 'POST',
    path: '/buildings',
    handler: controlller.createDataBuildings,
  },

  // get data
  {
    method: 'GET',
    path: '/buildings',
    handler: controlller.getDataBuildings,
  },

  // get data by id
  {
    method: 'GET',
    path: '/buildings/{id}',
    handler: controlller.getDataById,
  },

  // update data by id
  {
    method: 'PUT',
    path: '/buildings/{id}',
    handler: controlller.updateData,
  },

  // delet data by id
  {
    method: 'DELETE',
    path: '/buildings/{id}',
    handler: controlller.deleteData,
  },

];
