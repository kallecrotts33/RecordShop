const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy(err => {
            if (err) console.error(err);
            res.clearCookie('connect.sid'); // optional, clears the session cookie
            res.redirect('/login');
        });
    });
});

module.exports = router;
