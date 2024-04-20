
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse } = require('../utils/common/');
const { BookingService } = require('../services');
const { AppError } = require("../errors");

const inMemDb = {};

/**
 * POST Request /api/v1/bookings
 * Request Body -> {flightId:1,userId:2,noOfSeats:2}
 */
async function createBooking(req, res, next) {

    try {
        /**
         * Request Header i.e ['x-user-data'] contains user data
         * 
         * {
         *      id:
         *      name:
         *      email:
         * }
         */

        const dataRecieved = req.headers['x-user-data'];
        const userData = JSON.parse(dataRecieved);

        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: userData.id,
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

        const idempotencyKey = req.headers['x-idempotency-key'];

        if (!idempotencyKey) {

            throw new AppError(StatusCodes.BAD_REQUEST, 'Idempotency key missing', []);
        }
        if (inMemDb[idempotencyKey]) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Cannot retry on a successful payment', []);
        }
        /**
         * Request Header i.e ['x-user-data'] contains user data
         * 
         * {
         *      id:
         *      name:
         *      email:
         * }
         */

        const dataRecieved = req.headers['x-user-data'];
        const userData = JSON.parse(dataRecieved);

        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: userData.id,
            bookingId: req.body.bookingId,
            userName: userData.name,
            userEmail: userData.email
        });

        inMemDb[idempotencyKey] = idempotencyKey;

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