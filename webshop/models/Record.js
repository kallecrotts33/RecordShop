const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Record = sequelize.define('Record', {
  record_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  record_title: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  description: { type: DataTypes.TEXT },
  image_src: {type: DataTypes.TEXT},
  artist_id: {type: DataTypes.INTEGER, allowNull: false, references:{
      model: 'artists',
      key: 'artist_id'
    }
  },
  genre_id: {type: DataTypes.INTEGER, allowNull: false, references:{
      model: 'genres',
      key: 'genre_id'
    }
  }
}, { tableName: 'records', timestamps: false });


module.exports = Record;