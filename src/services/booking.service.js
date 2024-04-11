
const axios = require('axios');

const { BookingRepository } = require('../repositories');
const { AppError, InternalServerError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Logger, ServerConfig } = require('../config');
const { sequelize } = require('../models');


const bookingRepository = new BookingRepository();

async function createBooking(data) {

    return new Promise((resolve, reject) => {

        const result = sequelize.transaction(async function bookingImpl(t) {
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);

            const flightData = flight.data.data;

            if (data.noOfSeats > flightData.totalSeats) {
                reject(new AppError(StatusCodes.BAD_REQUEST, 'Cannot create booking', ['Not enough seats available']))
            }

            resolve(flightData);
        });
    })

}


module.exports = {
    createBooking
}