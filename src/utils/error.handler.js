
const { BaseError } = require("../errors");
const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('./common');

function errorHandler(err, req, res, next) {


    if (err instanceof BaseError) {

        ErrorResponse.statusCode = err.statusCode;
        ErrorResponse.message = err.message;
        ErrorResponse.error.explanation = err.details;

        return res
            .status(err.statusCode)
            .json(ErrorResponse);
    }

    ErrorResponse.error = err;
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
}

module.exports = errorHandler;