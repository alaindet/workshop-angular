const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const fakeLatency = require('./common/middleware/fake-latency');
const teamsRoutes = require('./features/teams/routes');
const matchesRoutes = require('./features/matches/routes');
const usersRoutes = require('./features/users/routes');

dotenv.config();
const app = express();
const port = 3000;

app.use(fakeLatency(0, 50));
// app.use(fakeLatency(100, 700));
app.use(cors());
app.use(express.json());
app.use('/teams', teamsRoutes);
app.use('/matches', matchesRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log(`Sports Watcher listening on port ${port}`);
});
