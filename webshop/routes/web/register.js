const express = require('express');
const router = express.Router(); // ✅
const bcrypt = require('bcrypt');
const User = require('../../models/User'); 



router.get("/", (req, res) => {
    res.render("register", { title: "Register" });
});

router.post("/", async (req, res) => {
    try {
        const { name, password, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            password: hashedPassword,
            isAdmin: isAdmin ? true : false
        });
        console.log("User registered:", name);
        res.redirect("/login");
    } catch (err) {
        console.error("Error registering user:", err);
        res.redirect("/register");
    }
});

module.exports = router;
