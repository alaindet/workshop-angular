const { readJsonData } = require('../../common/utils/json-data');

// "The database"
let teams = readJsonData('teams');

function getAllTeams() {
  return teams;
}

function createTeam(id, name) {
  const newTeam = { id, name };
  const existing = teams.find(t => t.id === id);

  if (existing) {
    throw new Error(`A team with id "${id}" already exists`);
  }

  teams.push(newTeam);
  return newTeam;
}

function deleteTeam(id) {
  const index = teams.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error(`Cannot find team with id "${id}"`);
  }

  const team = teams[index];
  teams = teams.filter(t => t.id !== id);
  return team;
}

module.exports = {
  getAllTeams,
  createTeam,
  deleteTeam,
};
