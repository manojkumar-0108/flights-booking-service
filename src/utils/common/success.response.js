const { StatusCodes } = require('http-status-codes');

const successResponse = {
    success: true,
    statusCode: StatusCodes.OK,//default
    message: "",
    data: {},
    error: {}
};

module.exports = successResponse;