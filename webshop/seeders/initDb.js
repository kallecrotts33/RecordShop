const sequelize = require('../config/database');
const Record = require('../models/Records');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

async function initDb() {
  await sequelize.sync({ force: true });

  const artists = await Artist.bulkCreate([
    { artist_name: "test artist" }
  ]);

  const genres = await Genre.bulkCreate([
    { genre_name: "test genre" }
  ]);

  const records = await Record.bulkCreate([
    { record_title: "test record", price: 15.49, description: "This is a test description", image_src: "test source", artist_id: artists[0].artist_id, genre_id: genres[0].genre_id}
  ]);

  console.log('Databas initierad med dummydata!');
  process.exit(0);
}

initDb().catch(console.error);