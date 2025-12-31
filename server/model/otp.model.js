const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const USER = require('./users.model');

const OTP = sequelize.define('OTP', {
    // Model attributes are defined here
    otp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USER,
            key: 'user_id'
        }
    },
    created_timestamp: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'otp',
    createdAt: false,
    updatedAt: false
    // Other model options go here
});


module.exports = OTP;