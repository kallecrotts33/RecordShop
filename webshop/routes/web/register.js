const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("register", { title: "Register" });
});

router.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            username: req.body.username,
            password: hashedPassword
        });
        res.redirect("/login");
    } catch {
        res.status(500).send("Error registering user");
        return;
    }

});
module.exports = router;
