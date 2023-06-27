const { readJsonData, writeJsonData } = require('../../common/utils/json-data');

function getMatches(req, res) {
  const matches = readJsonData('matches');
  res.send({
    message: 'All matches',
    data: matches,
  });
}

function createMatch(req, res) {
  const inputHome = req.body.home;
  const inputAway = req.body.away;
  const inputWinner = req.body.winner;

  if (!inputHome) {
    return res.status(400).send({
      message: 'Missing/invalid home team ID',
    });
  }

  if (!inputAway) {
    return res.status(400).send({
      message: 'Missing/invalid away team ID',
    });
  }

  if (
    !(
      inputWinner === null || // Draw
      inputWinner === inputHome || // Home wins
      inputWinner === inputAway // Away wins
    )
  ) {
    return res.status(400).send({
      message: 'Missing/invalid winner team ID',
    });
  }

  const matches = readJsonData('matches');
  const id = String(Date.now() * Math.random());
  const newMatch = { id, home: inputHome, away: inputAway, winner: inputWinner };
  matches.push(newMatch);
  writeJsonData('matches', matches);

  return res.status(201).send({
    message: 'Match created',
    data: newMatch,
  });
}

function deleteMatch(req, res) {
  const inputId = req.params.id;
  let matches = readJsonData('matches');
  const lengthBefore = matches.length;
  matches = matches.filter(m => m.id !== inputId);
  const lengthAfter = matches.length;

  if (lengthBefore === lengthAfter) {
    return res.status(404).send({
      message: `No match found with id "${inputId}"`,
    });
  }

  writeJsonData('matches', matches);
  res.send({
    message: `Match with id "${inputId}" was deleted`,
  });
}

module.exports = {
  getMatches,
  createMatch,
  deleteMatch,
};
