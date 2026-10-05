// MongoDB connection using Mongoose.
const mongoose = require('mongoose');
const config = require('./env');
const logger = require('../utils/logger');

// Mongoose readyState numbers -> readable names (used by the /health endpoint).
const STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

async function connectDB() {
  // Throw errors instead of silently queueing queries when the DB is unreachable.
  mongoose.set('strictQuery', true);

  // dbName forces the required database name even if the URI names a different one.
  await mongoose.connect(config.mongodbUri, { dbName: config.dbName });

  // Log only the DB name and host, never the full URI (it contains the password).
  logger.info('MongoDB connected', { database: config.dbName, host: mongoose.connection.host });
  return mongoose.connection;
}

function getDbState() {
  return STATES[mongoose.connection.readyState] || 'unknown';
}

module.exports = { connectDB, getDbState };
