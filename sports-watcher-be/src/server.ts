import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { morganFormatter } from './core/middleware';
import { fakeLatency } from './common/middleware';
import teamsRoutes from './features/teams/routes';
import matchesRoutes from './features/matches/routes';
import usersRoutes from './features/users/routes';

// Initialize
dotenv.config();
const app = express();
const appName = process.env.SPORTS_WATCHER_APP_NAME ?? 'Sports Watcher API';
const appPort = process.env.SPORTS_WATCHER_APP_PORT ?? 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fakeLatency(100, 700));
app.use(morgan(morganFormatter));

// Routes
app.use('/teams', teamsRoutes);
app.use('/matches', matchesRoutes);
app.use('/users', usersRoutes);
// ...

// Bootstrap
app.listen(appPort, () => {
  console.log(`${appName} started on port ${appPort}`)
});
