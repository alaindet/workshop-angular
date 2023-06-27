import { Team } from '../teams';

export type Match = {
  id: string;
  home: Team['id'];
  away: Team['id'];
  winner: Team['id'] | null;
};

export type CreateMatchDto = Omit<Match, 'id'>;

export type MatchesReport = {
  wins: number;
  winsPercentage: number;
  draws: number;
  drawsPercentage: number;
  losses: number;
  lossesPercentage: number;
  total: number;
};

export type TeamRanking = {
  ranking: number;
  score: number;
  team: Team;
  report: MatchesReport;
};
