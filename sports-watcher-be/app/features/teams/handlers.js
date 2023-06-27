const teamsService = require('./service');

function getTeams(req, res) {
  const teams = teamsService.getAllTeams();
  const data = teams;
  const message = 'All teams';
  res.send({ data, message });
}

function createTeam(req, res) {

  const inputId = req.body.id;
  const inputName = req.body.name;

  if (!inputId) {
    const message = 'Missing/invalid ID';
    return res.status(400).send({ message });
  }

  if (!inputName) {
    const message = 'Missing/invalid name';
    return res.status(400).send({ message });
  }

  try {
    const newTeam = teamsService.createTeam(inputId, inputName);
    const data = newTeam;
    const message = `Created new team "${newTeam.name}"`;
    res.status(201).send({ data, message });
  }

  catch (err) {
    return res.status(409).send({ message: err.message });
  }
}

function deleteTeam(req, res) {

  const inputId = req.params.id;

  try {
    const deletedTeam = teamsService.deleteTeam(inputId);
    const data = deletedTeam;
    const message = `Deleted team ${inputId}`;
    res.send({ data, message });
  }

  catch (err) {
    return res.status(404).send({ message: err.message });
  }
}

module.exports = {
  getTeams,
  createTeam,
  deleteTeam,
};
