const express = require('express');
const { PingCheckController } = require('../../controllers/');

const bookingRoutes = require('./booking.routes');


const v1Routes = express.Router();

/**
 * /api/v1/ping
 */

v1Routes.get('/ping', PingCheckController);

/**
 * /api/v1/bookings
 */

v1Routes.use('/bookings', bookingRoutes);


module.exports = v1Routes;