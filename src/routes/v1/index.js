const express = require('express');
const { PingCheckController } = require('../../controllers/');

const v1Routes = express.Router();

v1Routes.get('/ping', PingCheckController);

module.exports = v1Routes;