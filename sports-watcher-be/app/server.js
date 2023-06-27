const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const fakeLatency = require('./common/middleware/fake-latency');
const teamsRoutes = require('./features/teams/routes');
const matchesRoutes = require('./features/matches/routes');
const usersRoutes = require('./features/users/routes');

// Initialize
dotenv.config();
const app = express();
const appName = process.env.SPORTS_WATCHER_APP_NAME ?? 'Sports Watcher API';
const appPort = process.env.SPORTS_WATCHER_APP_PORT ?? 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fakeLatency(100, 700));
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
}));

// Endpoints
app.use('/teams', teamsRoutes);
app.use('/matches', matchesRoutes);
app.use('/users', usersRoutes);

// Bootstrap
app.listen(appPort, () => console.log(`${appName} started on port ${appPort}`));
