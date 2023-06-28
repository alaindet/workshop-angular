import { Request, Response } from 'express';

import { MatchesService } from './service';

const matchesService = MatchesService.getInstance();

// GET /matches
export function getMatches(req: Request, res: Response) {
  const matches = matchesService.getAllMatches();
  const data = matches;
  const message = 'All matches';
  res.send({ message, data });
}

// POST /matches
export function createMatch(req: Request, res: Response) {
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
  return res.status(201).send({ message, data });
}

// DELETE /matches/:id
export function deleteMatch(req: Request, res: Response) {
  const inputId = req.params.id;

  try {
    const deletedMatch = matchesService.deleteMatch(inputId);
    const message = `Match with id "${deletedMatch.id}" was deleted`;
    res.send({ message });
  }

  catch (err) {
    const message = (err as Error).message;
    return res.status(404).send({ message });
  }
}
