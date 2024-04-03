'use strict';

const { Enums } = require('../utils/common');
const { INITIATED, BOOKED, PENDING, CANCELLED } = Enums.BOOKING_STATUS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addConstraint('Bookings', {
      type: 'check',
      fields: ['status'],
      name: 'CK_Bookings_Status',
      where: {
        status: [BOOKED, PENDING, INITIATED, CANCELLED]
      }
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    queryInterface.removeConstraint('CK_Bookings_Status');
  }
};
