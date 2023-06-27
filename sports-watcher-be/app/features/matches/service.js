const { readJsonData } = require('../../common/utils/json-data');

// "The database"
let matches = readJsonData('matches');

function getAllMatches() {
  return matches;
}

function createMatch(home, away, winner) {
  const id = String(Date.now() * Math.random());
  const newMatch = { id, home, away, winner };
  matches.push(newMatch);
  return newMatch;
}

function deleteMatch(id) {
  const index = matches.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error(`Cannot find match with id "${id}"`);
  }

  const match = matches[index];
  matches = matches.filter(t => t.id !== id);
  return match;
}

module.exports = {
  getAllMatches,
  createMatch,
  deleteMatch,
};
