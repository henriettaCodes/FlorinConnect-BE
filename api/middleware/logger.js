function logRoutes(req, res, next) {
    console.log(`Request ${req.method} sent to ${req.originalUrl} at ${new Date().toLocaleString()}`);
    next();
}

module.exports = logRoutes;