const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const USERS = sequelize.define(
  'USERS',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    contact_no: {
      type: DataTypes.STRING(10), // safer than NUMBER for phone
      allowNull: true,
    },

    email_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    created_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    updated_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = USERS;