const matchesService = require('./service');

function getMatches(req, res) {
  const matches = matchesService.getAllMatches();
  const data = matches;
  const message = 'All matches';
  res.send({ data, message });
}

function createMatch(req, res) {
  const inputHome = req.body.home;
  const inputAway = req.body.away;
  const inputWinner = req.body.winner;

  if (!inputHome) {
    return res.status(400).send({ message: 'Missing/invalid home team ID' });
  }

  if (!inputAway) {
    return res.status(400).send({ message: 'Missing/invalid away team ID' });
  }

  if (!(inputWinner === null || inputWinner === inputHome || inputWinner === inputAway)) {
    return res.status(400).send({ message: 'Missing/invalid winner team ID' });
  }

  const newMatch = matchesService.createMatch(inputHome, inputAway, inputWinner);
  const data = newMatch;
  const message = 'Match created';
  return res.status(201).send({ data, message });
}

function deleteMatch(req, res) {
  const inputId = req.params.id;

  try {
    const deletedMatch = matchesService.deleteMatch(inputId);
    const message = `Match with id "${deletedMatch.id}" was deleted`;
    res.send({ message });
  }

  catch (err) {
    return res.status(404).send({ message: err.message });
  }
}

module.exports = {
  getMatches,
  createMatch,
  deleteMatch,
};
