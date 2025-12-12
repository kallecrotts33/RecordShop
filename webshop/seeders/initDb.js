const sequelize = require('../config/database');
const Record = require('../models/Record');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

async function initDb() {
  await sequelize.sync({ force: true });

  const artists = await Artist.bulkCreate([
    { artist_name: "Eagles" }
  ]);

  const genres = await Genre.bulkCreate([
    { genre_name: "Rock" }
  ]);

  const records = await Record.bulkCreate([
    { record_title: "Eagles: The Legend of", price: 15.49, description: "Collection of great Eagles songs", image_src: ["front1", "back1", "sleeve1"], artist_id: artists[0].artist_id, genre_id: genres[0].genre_id}
  ]);

  const users = await Genre.bulkCreate([
  ]);

  console.log('Databas initierad med dummydata!');
  process.exit(0);
}

initDb().catch(console.error);