const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const CATEGORY = sequelize.define(
  'CATEGORY',
  {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    category_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: 'category',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = CATEGORY;