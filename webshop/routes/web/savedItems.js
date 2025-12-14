const express = require('express');
const router = express.Router();

router.get("/savedItems", async (req, res) => {
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
    res.render("savedItems", { records: enrichedRecords, artists, genres, title: "Products" });

});

module.exports = router;
