
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse } = require('../utils/common/');
const { BookingService } = require('../services');

/**
 * POST Request /api/v1/bookings
 * Request Body -> {flightId:1,userId:2,noOfSeats:2}
 */
async function createBooking(req, res, next) {

    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });

        SuccessResponse.data = response;
        SuccessResponse.statusCode = StatusCodes.CREATED;
        SuccessResponse.message = "Bookings initiated successfully";

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}


/**
 * POST Request /api/v1/bookings/payments
 * Request Body -> {totalCost:4500, userId:4,bookingId:2}
 */
async function makePayment(req, res, next) {

    try {

        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });

        SuccessResponse.data = response;
        SuccessResponse.statusCode = StatusCodes.OK;
        SuccessResponse.message = "Payment successfull!!";

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}





module.exports = {
    createBooking,
    makePayment
}