const express = require('express');
const { PingCheckController, BookingController } = require('../../controllers');
const { BookingMiddlewares } = require('../../middlewares');


const bookingRouter = express.Router();

/**
 * GET request
 * /api/v1/bookings/ping
 */
bookingRouter.get('/ping', PingCheckController);

/**
 * POST request 
 * /api/v1/bookings/
 * 
 * req body {flightId:10,userId:1,noOfSeats:10}
 */

bookingRouter.post('/',
    BookingMiddlewares.validateCreateBookingRequest,
    BookingController.createBooking);


module.exports = bookingRouter;