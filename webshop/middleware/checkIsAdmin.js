function checkIsAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
}

module.exports = checkIsAdmin;