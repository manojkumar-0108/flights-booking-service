const express = require('express');
const { PingCheckController } = require('../../controllers');


const bookingRouter = express.Router();

bookingRouter.get('/ping', PingCheckController);

module.exports = bookingRouter;