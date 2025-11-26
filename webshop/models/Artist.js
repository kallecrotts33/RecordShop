const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artist = sequelize.define('Artist', {
  artist_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artist_name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'artists', timestamps: false });

module.exports = Artist;