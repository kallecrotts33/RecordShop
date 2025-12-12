const express = require('express');
const router = express.Router();

router.get("/cart", async (req, res) => {
    const records = await fetch("http://localhost:3000/api/records")
        .then(r => r.json());
    res.render("cart", { records, title: "Shopping Cart" });
});

module.exports = router;
