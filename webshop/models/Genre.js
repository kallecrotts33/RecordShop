const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genre = sequelize.define('Genre', {
  genre_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  genre_name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'genres', timestamps: false });

module.exports = Genre;