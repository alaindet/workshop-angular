import { Request, Response } from 'express';

import { TeamsService } from './service';

const teamsService = TeamsService.getInstance();

// GET /teams
export function getTeams(req: Request, res: Response) {
  const teams = teamsService.getAllTeams();
  const data = teams;
  const message = 'All teams';
  res.send({ message, data });
}

// POST /teams
export function createTeam(req: Request, res: Response) {

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
    res.status(201).send({ message, data });
  }

  catch (err) {
    const message = (err as Error).message;
    return res.status(409).send({ message });
  }
}

// DELETE /teams/:id
export function deleteTeam(req: Request, res: Response) {

  const inputId = req.params.id;

  try {
    const deletedTeam = teamsService.deleteTeam(inputId);
    const data = deletedTeam;
    const message = `Deleted team ${inputId}`;
    res.send({ message, data });
  }

  catch (err) {
    const message = (err as Error).message;
    return res.status(404).send({ message });
  }
}
