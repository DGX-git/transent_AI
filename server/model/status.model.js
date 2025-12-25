const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const STATUS = sequelize.define(
  'STATUS',
  {
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    status_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: 'status',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = STATUS;