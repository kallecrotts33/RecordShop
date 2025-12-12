const express = require('express');
const router = express.Router();

router.get("/recordInfo", async (req, res) => {
    const id = req.query.id;
    const record = await fetch(`http://localhost:3000/api/records/${id}`)
        .then(r => r.json());
    res.render("recordInfo", { record });
});

module.exports = router;
