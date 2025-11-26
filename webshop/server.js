/**
 * Express-server with Handlebars using main.hbs layout
 */
"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

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
app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
});