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

const sequelize = require('./config/database');

// Modeller
const Record = require('./models/Record');
const Artist = require('./models/Artist');
const Genre = require('./models/Genre');

// Relationer
Record.belongsTo(Artist, { foreignKey: "artist_id" });
Artist.hasMany(Record, { foreignKey: "artist_id" });
Record.belongsTo(Genre, { foreignKey: "genre_id" });
Genre.hasMany(Record, { foreignKey: "genre_id" });

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

// Route for start page
app.get("/", (req, res) => {
    res.render("index", { title: "Main Page" });
});

// Route for about page
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
  });
});