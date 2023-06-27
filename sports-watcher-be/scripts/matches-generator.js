const fs = require('fs');
const path = require('path');

const teams = require('../database/teams.json');

const results = [];

for (const team of teams) {
  const otherTeams = teams.filter(t => t.id !== team.id);
  for (const otherTeam of otherTeams) {
    for (const _ of [1, 2, 3]) {

      const rnd = Math.random();

      const winner = rnd < 0.2
        ? null
        : (rnd < 0.6 ? team.id : otherTeam.id);

      results.push({
        id: String(Date.now() * Math.random()),
        home: team.id,
        away: otherTeam.id,
        winner,
      });
    }
  }
}

const thePath = path.join(path.dirname(__dirname), 'database', 'matches.json');
const theContent = JSON.stringify(results);

fs.writeFileSync(thePath, theContent);

console.log(`Done! Check ${thePath}`);
