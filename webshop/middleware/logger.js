module.exports = function logger(req, res, next) {
    console.info(`Request received on ${req.path} (${req.method})`);
    next();
};
