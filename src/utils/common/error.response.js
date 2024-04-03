const { StatusCodes } = require('http-status-codes');

const errorResponse = {
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,//default
    message: "Something went wrong!!!",
    data: {},
    error: {
        explanation: []
    }
};

module.exports = errorResponse;