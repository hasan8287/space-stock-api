const Boom = require('boom');

const model = require('./model');

const controller = {};

controller.deleteData = async (request, reply) => {
  try {
    const { params } = request;
    const { id } = params;

    const action = await model.deleteData(id);

    if (!action) {
      return Boom.badGateway('failed update data');
    }

    return reply.response({
      data: {
        id,
      },
    }).code(200);
  } catch {
    return Boom.badRequest(error.message);
  }
}

controller.updateData = async (request, reply) => {
  try {
    const { payload, params } = request;
    const { id } = params;

    const action = await model.updateData(payload, id);

    if (!action) {
      return Boom.badGateway('failed update data');
    }

    return reply.response({
      data: action,
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

controller.createDataBuildings = async (request, reply) => {
  try {
    const { payload } = request;

    const action = await model.createData(payload);

    if (!action) {
      return Boom.badGateway('failed save data');
    }

    return reply.response({
      data: action,
    }).code(201);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

controller.getDataBuildings = async (request, reply) => {
  try {
    const { query } = request;

    const { page, limit, name, type } = query;
    let code = 200;

    const data = await model.getData(page, limit, name, type);

    return reply.response({
      data,
    }).code(code);

  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

controller.getDataById = async (request, reply) => {
  try {
    const { params } = request;
    const { id } = params;
    let code = 200;

    const data = await model.getById(id);

    if (!data) {
      code = 204;
    }

    return reply.response({
      data,
    }).code(code);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

module.exports = controller;
