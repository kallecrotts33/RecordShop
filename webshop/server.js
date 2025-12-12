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

const hbs = exphbs.create({
    helpers: {
        json: function(context) {
            return JSON.stringify(context);
        }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// Configure Handlebars with main.hbs as default layout
app.engine("hbs", exphbs.engine({ 
    extname: ".hbs",
    defaultLayout: "main" // Använder main.hbs som standardlayout
}));
app.set("view engine", "hbs");

// Middleware
const logger = require('./middleware/logger');
app.use(logger);


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
const indexRoute = require('./routes/web');
app.use('/', indexRoute);
const aboutRoute = require('./routes/web/about');
app.use('/', aboutRoute);
const cartRoute = require('./routes/web/cart');
app.use('/', cartRoute);
const productsRoute = require('./routes/web/products');
app.use('/', productsRoute);
const savedItemsRoute = require('./routes/web/savedItems');
app.use('/', savedItemsRoute);
const productInfoRoute = require('./routes/web/productInfo');
app.use('/', productInfoRoute);

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
  });
});