const sequelize = require('../config/database');
const Record = require('../models/Record');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');
const User = require('../models/User');

const bcrypt = require('bcrypt');

async function initDb() {
  await sequelize.sync({ force: true });

  const artists = await Artist.bulkCreate([
    { artist_name: "Eagles" },
    {artist_name: "Dire Straits" },
    {artist_name: "Chris Rea" },
    {artist_name: "Phil Collins" }
  ]);

  const genres = await Genre.bulkCreate([
    { genre_name: "Rock" },
    { genre_name: "Pop" },
    { genre_name: "Jazz" },
    { genre_name: "Classical" }
  ]);

  const records = await Record.bulkCreate([
    { record_title: "Eagles: The Legend of", price: 15.49, description: "Collection of great Eagles songs", image_src: ["front1", "back1", "sleeve1"], artist_id: artists[0].artist_id, genre_id: genres[0].genre_id},
    { record_title: "Love Over Gold", price: 12.49, description: "A great album by Dire Straits", image_src: ["front2", "back2", "sleeve2"], artist_id: artists[1].artist_id, genre_id: genres[1].genre_id},
    { record_title: "The Road to Hell", price: 14.99, description: "Hit album by Chris Rea", image_src: ["front3", "back3", "sleeve3"], artist_id: artists[2].artist_id, genre_id: genres[0].genre_id},
    { record_title: "...But Seriously", price: 11.99, description: "Popular album by Phil Collins", image_src: ["front4", "back4", "sleeve4"], artist_id: artists[3].artist_id, genre_id: genres[1].genre_id},
    { record_title: "Love Over Gold", price: 2.99, description: "Missing record, only sold as artwork!", image_src: ["front2", "back2"], artist_id: artists[1].artist_id, genre_id: genres[1].genre_id},

  ]);

  const users = await User.bulkCreate([
  { name: "admin", password: await bcrypt.hash("admin", 10), isAdmin: true },
  { name: "user", password: await bcrypt.hash("user", 10), isAdmin: false }

]);

  console.log('Databas initierad med dummydata!');
  process.exit(0);
}

initDb().catch(console.error);