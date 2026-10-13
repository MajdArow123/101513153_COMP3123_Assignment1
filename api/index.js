// Vercel entry point.
// Vercel runs this file as a serverless function: there is no long-running server and
// no app.listen(). An Express app is itself a (req, res) handler, so we just export it.
// The database connection is opened lazily (and cached) by the ensureDb middleware.
const app = require('../src/app');

module.exports = app;
