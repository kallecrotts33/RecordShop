/**
 * Express-server with Handlebars using main.hbs layout
 */
"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path');
require('dotenv').config();
const app = express();
const { swaggerUi, swaggerSpec } = require('./swagger');
const cors = require('cors');
app.use(cors());
app.use(express.json()); 

// Serve images folder at /images URL
app.use('/images', express.static(path.join(__dirname, 'images')));


const sequelize = require('./config/database');

// Modeller
const Record = require('./models/Record');
const Artist = require('./models/Artist');
const Genre = require('./models/Genre');





// Configure Handlebars with main.hbs as default layout
app.engine("hbs", exphbs.engine({ 
    extname: ".hbs",
    defaultLayout: "main" // Använder main.hbs som standardlayout
}));
app.set("view engine", "hbs");

// Middleware to log requests
app.use((req, res, next) => {
    console.info(`Request received on ${req.path} (${req.method})`);
    next();
});

// API routes
const recordsRouter = require('./routes/api/records');
app.use('/api/records', recordsRouter);
const artistsRouter = require('./routes/api/artists');
app.use('/api/artists', artistsRouter);
const genresRouter = require('./routes/api/genres');
const { title } = require("process");
app.use('/api/genres', genresRouter);


//Swagger docs route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Relationer
Artist.hasMany(Record, { foreignKey: 'artist_id' });
Record.belongsTo(Artist, { foreignKey: 'artist_id' });
Genre.hasMany(Record, { foreignKey: 'genre_id' });
Record.belongsTo(Genre, { foreignKey: 'genre_id' });

// Route for navigation
app.get("/", (req, res) => {
    res.render("index", { title: "Main Page" });
});
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});
app.get("/products", async (req, res) => {
    const records = await fetch("http://localhost:3000/api/records")
        .then(r => r.json());

    const artists = await fetch("http://localhost:3000/api/artists")
        .then(r => r.json());

    const genres = await fetch("http://localhost:3000/api/genres")
        .then(r => r.json());
    const enrichedRecords = records.map(record => {
        const artist = artists.find(a => a.artist_id === record.artist_id);
        const genre = genres.find(g => g.genre_id === record.genre_id);
        return {
            ...record,
            artist_name: artist ? artist.artist_name : "Unknown Artist",
            genre_name: genre ? genre.genre_name : "Unknown Genre"
        };
    });
    res.render("products", { records: enrichedRecords, artists, genres, title: "Products" });

});

app.get("/recordInfo", async (req, res) => {
    const id = req.query.id;
    const record = await fetch(`http://localhost:3000/api/records/${id}`)
        .then(r => r.json());
    res.render("recordInfo", { record });
});
app.get("/cart", async (req, res) => {
    const records = await fetch("http://localhost:3000/api/records")
        .then(r => r.json());
    res.render("cart", { records, title: "Shopping Cart" });
});




// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
  });
});