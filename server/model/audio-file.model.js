const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const AUDIO_FILE = sequelize.define(
  'AUDIO_FILE',
  {
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    file_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    file_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    file_size: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    duration: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    file_path: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status_id: {
      type: DataTypes.INTEGER,
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
    tableName: 'audio_file',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = AUDIO_FILE;