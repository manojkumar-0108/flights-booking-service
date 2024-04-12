
const { Booking } = require('../models');
const CrudRepository = require('./crud.repository');
const { AppError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const { Enums } = require('../utils/common')
const { CANCELLED, BOOKED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await this.model.create(data, { transaction: transaction });
        return response;
    }

    async get(id, transaction) {
        const response = await this.model.findByPk(id, { transaction: transaction });

        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Resource requested is not available', []);
        }

        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ....}

        const response = await this.model.update(data, {
            where: {
                id: id
            }
        }, { transaction: transaction });

        return response;
    }

    async cancelOldBookings(timestamp) {

        const [affectedCount, affectedRows] = await this.model.update({ status: CANCELLED }, {
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    },
                    {
                        status: {
                            [Op.notIn]: [BOOKED, CANCELLED]
                        }
                    }
                ]
            }, returning: true
        });

        let result = [];

        /**
         * Increasing seats in flights for the cancelled bookings
         * We need flightId as well as noOfSeats to increase
         * as we can have many cancelled bookings for single flight 
         * and we can also have multiple flightId 
         * considering this, we are creating an array of objec
         * [ {flightId:1,noOfSeats:2}]
         */
        if (affectedCount > 0) {
            affectedRows.map((row) => {
                const flightIdToUpdate = row.dataValues.flightId;
                const seatsToAdd = row.dataValues.noOfSeats;

                // Finding the index with the specified flightId
                const index = result.findIndex(obj => obj.flightId === flightIdToUpdate);

                if (index !== -1) {
                    result[index].noOfSeats += seatsToAdd;
                } else {
                    result.push({
                        flightId: flightIdToUpdate,
                        noOfSeats: seatsToAdd
                    });
                }
            });
        }

        return result;
    }

}

module.exports = BookingRepository