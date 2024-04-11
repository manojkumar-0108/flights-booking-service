
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse } = require('../utils/common/');
const { BookingService } = require('../services');


async function createBooking(req, res, next) {

    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });

        SuccessResponse.data = response;
        SuccessResponse.statusCode = StatusCodes.CREATED;
        SuccessResponse.message = "Created bookings successfully";

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}
module.exports = {
    createBooking
}