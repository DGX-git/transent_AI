const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const TRANSCRIPTION = sequelize.define(
  'TRANSCRIPTION',
  {
    transcription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    transcripted_text: {
      type: DataTypes.STRING(500),
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
    tableName: 'transcription',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = TRANSCRIPTION;