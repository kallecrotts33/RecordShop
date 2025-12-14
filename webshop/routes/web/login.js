const express = require('express');
const router = express.Router();
const passport = require('passport');



router.get('/', (req, res) => {
    res.render('login', { title: 'Log in' });
});

// router.post('/',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     })
// );

router.post('/', (req, res, next) => {
    console.log("BODY RECEIVED:", req.body);
    next();
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));



module.exports = router;
