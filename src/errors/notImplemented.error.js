
const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base.error');


class NotImplementedError extends BaseError {
    constructor(propertyName) {
        super("NOT-IMPLEMENTED-ERROR", StatusCodes.NOT_IMPLEMENTED, `${propertyName} is Not Implemented`, {});
    }
}

module.exports = NotImplementedError;