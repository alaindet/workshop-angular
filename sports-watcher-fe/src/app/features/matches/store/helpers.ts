import { Team } from '@app/features/teams';
import { Match, MatchesReport, TeamRanking } from '../types';

export function createEmptyMatchesReport(): MatchesReport {
  return {
    wins: 0,
    winsPercentage: 0,
    draws: 0,
    drawsPercentage: 0,
    losses: 0,
    lossesPercentage: 0,
    total: 0,
  };
}

export function calculateMatchesReport(
  teamId: Team['id'],
  matches: Match[],
): MatchesReport {

  let wins = 0;
  let draws = 0;
  let losses = 0;

  matches.forEach(match => {
    switch (match.winner) {
      case teamId:
        wins++;
        break;
      case null:
        draws++;
        break;
      default:
        losses++;
        break;
    }
  });

  const total = wins + draws + losses;
  const winsPercentage = Number((100 * (wins / total)).toFixed(2));
  const drawsPercentage = Number((100 * (draws / total)).toFixed(2));
  const lossesPercentage = Number((100 * (losses / total)).toFixed(2));

  return {
    wins,
    winsPercentage,
    draws,
    drawsPercentage,
    losses,
    lossesPercentage,
    total,
  };
}

export function sortRankings(a: TeamRanking, b: TeamRanking): -1 | 0 | 1 {
  const aScore = a.score;
  const bScore = b.score;

  if (aScore !== bScore) {
    return aScore < bScore ? 1 : -1;
  }

  const aWinRate = a.report.winsPercentage;
  const bWinRate = b.report.winsPercentage;

  if (aWinRate !== bWinRate) {
    return aWinRate < bWinRate ? 1 : -1;
  }

  const aLossRate = a.report.lossesPercentage;
  const bLossRate = b.report.lossesPercentage;

  if (aLossRate !== bLossRate) {
    return aLossRate < bLossRate ? 1 : -1;
  }

  const aDrawsRate = a.report.drawsPercentage;
  const bDrawsRate = b.report.drawsPercentage;

  if (aDrawsRate !== bDrawsRate) {
    return aDrawsRate < bDrawsRate ? 1 : -1;
  }

  return 0;
}
