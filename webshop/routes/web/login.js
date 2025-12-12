const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.render("login", { title: "Log in" });
});

module.exports = router;
