const express = require('express');
const { PingCheckController } = require('../../controllers/');

const bookingRoutes = require('./booking.routes');


const v1Routes = express.Router();

/**
 * /api/v1/ping
 */

v1Routes.get('/ping', PingCheckController);

v1Routes.use('/bookings', bookingRoutes);


module.exports = v1Routes;