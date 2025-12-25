const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const SENTIMENT_ANALYSIS = sequelize.define(
  'SENTIMENT_ANALYSIS',
  {
    sentiment_analysis_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    student_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    parent_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    grade_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    category_id: {
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
    tableName: 'sentiment_analysis',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = SENTIMENT_ANALYSIS;