
const BaseError = require("./base.error");

class AppError extends BaseError {

    constructor(statusCode, message, details) {
        super("APP-ERROR", statusCode, message, details);
    }
}

module.exports = AppError;