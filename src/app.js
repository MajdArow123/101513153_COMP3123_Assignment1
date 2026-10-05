// Builds and configures the Express app.
// It does NOT call listen(): server.js (local) and api/index.js (Vercel)
// each start it in their own way, so the app itself stays reusable.
const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Don't advertise that we run Express (less information for attackers).
app.disable('x-powered-by');

// Log requests first so even requests that fail later (e.g. bad JSON) are recorded.
app.use(requestLogger);

app.use(cors());

// Parse JSON bodies; the size limit protects against very large payloads.
app.use(express.json({ limit: '10kb' }));

// ---- Routes ----
app.use('/health', healthRoutes);
app.use('/api/v1/user', userRoutes);

// ---- Fallbacks (must be last) ----
app.use(notFound); // no route matched -> 404
app.use(errorHandler); // any error -> standard JSON error response

module.exports = app;
