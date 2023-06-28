import { Match } from '../matches';

export type Team = {
  id: string;
  name: string;
};

export type TeamWithMatches = {
  team: Team;
  matches: Match[];
};
