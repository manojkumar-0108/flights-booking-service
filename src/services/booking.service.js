
const axios = require('axios');

const { BookingRepository } = require('../repositories');
const { AppError, InternalServerError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Logger, ServerConfig, MessageQueue } = require('../config');
const { sequelize } = require('../models');

const { Enums } = require('../utils/common/');
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

const bookingRepository = new BookingRepository();



async function createBooking(data) {

    const transaction = await sequelize.transaction();

    try {

        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);

        const flightData = flight.data.data;

        if (data.noOfSeats > flightData.totalSeats) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Cannot create booking', ['Not enough seats available', `Remaining Seats = ${flightData.totalSeats}`]);
        }

        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = { ...data, totalCost: totalBillingAmount };
        const booking = await bookingRepository.create(bookingPayload, transaction);

        //updating seats in flight
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeats
        });

        await transaction.commit();
        return booking;

    } catch (error) {
        await transaction.rollback();

        if (error.name == 'AggregateError') {
            throw new AppError(StatusCodes.GATEWAY_TIMEOUT, 'Cannot create bookings', ['Unable to fetch flight records']);
        }
        throw new InternalServerError('Cannot create bookings');
    }
}

async function makePayment(data) {
    const transaction = await sequelize.transaction();

    try {
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);

        if (bookingDetails.status == CANCELLED) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Booking is already cancelled', []);
        }

        if (bookingDetails.status == BOOKED) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Booking is already confirmed', []);
        }


        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();


        //5 minutes deadline for completing booking
        if (currentTime - bookingTime > 300000) {
            await bookingRepository.update(data.bookingId, { status: CANCELLED }, transaction);
            await cancelBooking(data.bookingId);
            throw new AppError(StatusCodes.BAD_REQUEST, 'Booking has Expired', []);
        }

        if (bookingDetails.totalCost != data.totalCost) {

            let details = new Array();

            if (data.totalCost < bookingDetails.totalCost) {
                details.push('Amount paid is less than booking amount');
            }

            if (data.totalCost > bookingDetails.totalCost) {
                details.push('Amount paid is greater than booking amount');
            }

            throw new AppError(StatusCodes.BAD_REQUEST, 'Payment failed', details);
        }

        if (bookingDetails.userId != data.userId) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Something went wrong during validation', ['The user corresponding to the booking doesnt match']);
        }


        // we assume here that payment is successful
        await bookingRepository.update(data.bookingId, { status: BOOKED }, transaction);

        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}`);
        const flightData = flight.data.data;

        /**
         * Sending confirmation message to message queue
         */
        MessageQueue.sendData({

            subject: 'Booking Confirmed! 🥳',
            content: `Hi ${data.userName},\nYour booking is confirmed! 🎉 \n\nBooking Details\nTime: ${new Date()}\nFlight Number: ${flightData.flightNumber}\nNo of Seats: ${bookingDetails.noOfSeats}\nTotal Amount Paid: ${bookingDetails.totalCost}\n\nThank you for choosing us! We can't wait to see you.\nGot questions? Reply to this email or give us a call!\nBest wishes,`,
            recepientEmail: data.userEmail
        })

        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        if (error instanceof AppError) {
            throw error;
        }
        throw new InternalServerError('Payments failed! Please retry');
    }

}


async function cancelBooking(bookingId) {
    const transaction = await sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId, transaction);

        if (bookingDetails.status == CANCELLED) {
            await transaction.commit();
            return true;
        }

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`, {
            seats: bookingDetails.noOfSeats,
            dec: 0
        });

        await bookingRepository.update(bookingId, { status: CANCELLED }, transaction);
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw new InternalServerError('Something went wrong...');
    }
}


async function cancelOldBookings() {
    try {

        const time = new Date(Date.now() - 1000 * 300); // time 5 mins ago
        const response = await bookingRepository.cancelOldBookings(time);

        //Increasing all the cancelled seats

        if (response.length > 0) {

            for (let i = 0; i < response.length; i++) {
                await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${response[i].flightId}/seats`, {
                    seats: response[i].noOfSeats,
                    decrease: '0'
                });
            }

        }
        return response;

    } catch (error) {
        console.log(error);
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went worng!', [error]);
    }
}
module.exports = {
    createBooking,
    makePayment,
    cancelOldBookings
}