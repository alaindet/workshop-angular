const { readJsonData, writeJsonData } = require('../../common/utils/json-data');

function getTeams(req, res) {
  const teams = readJsonData('teams');
  res.send({
    message: 'All teams',
    data: teams,
  });
}

function createTeam(req, res) {

  const inputId = req.body.id;
  const inputName = req.body.name;

  if (!inputId) {
    return res.status(400).send({
      message: 'Missing/invalid ID',
    });
  }

  if (!inputName) {
    return res.status(400).send({
      error: 'Missing/invalid name',
    });
  }

  const newTeam = { id: inputId, name: inputName };
  const teams = readJsonData('teams');
  const existing = teams.find(t => t.id === req.body.id);

  if (existing) {
    return res.status(409).send({
      message: `A team with id "${req.body.id}" already exists`,
    });
  }

  teams.push(newTeam);
  writeJsonData('teams', teams);

  res.status(201).send({
    message: 'Created new team',
    data: newTeam,
  });
}

function deleteTeam(req, res) {

  const teamId = req.params.id;
  let teams = readJsonData('teams');
  const index = teams.findIndex(t => t.id === teamId);

  if (index === -1) {
    return res.status(404).send({
      message: `Cannot find team with id "${teamId}"`,
    });
  }

  teams = teams.filter(t => t.id !== teamId);
  writeJsonData('teams', teams);

  res.send({
    message: `Deleted team ${teamId}`,
  });
}

module.exports = {
  getTeams,
  createTeam,
  deleteTeam,
};
