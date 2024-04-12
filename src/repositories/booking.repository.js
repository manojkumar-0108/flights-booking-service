
const { Booking } = require('../models');
const CrudRepository = require('./crud.repository');
const { AppError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');

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

}

module.exports = BookingRepository