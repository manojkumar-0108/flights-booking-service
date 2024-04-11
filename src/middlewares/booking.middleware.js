
const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");

function validateCreateBookingRequest(req, res, next) {

    if (!req.body.flightId || !req.body.userId || !req.body.noOfSeats) {

        let details = new Array();

        if (!req.body.flightId) {
            details.push("flightId is not found in incomming request in correct form")
        }

        if (!req.body.userId) {
            details.push("userId is not found in incomming request in correct form")
        }

        if (!req.body.noOfSeats) {
            details.push("noOfSeats is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    next();
}

module.exports = {
    validateCreateBookingRequest
};

