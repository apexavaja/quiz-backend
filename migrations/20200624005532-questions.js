'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option_a: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option_b: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option_c: {
        type: Sequelize.STRING,
        allowNull: false
      },
      option_d: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correct: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isDel: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
