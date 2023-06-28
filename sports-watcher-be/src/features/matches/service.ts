import { loadDatabaseTable } from '../../common/utils';
import { Match } from '../../types';

export class MatchesService {

  static #instance: MatchesService;
  #matches!: Match[]; // The "database"

  constructor() {
    this.#matches = loadDatabaseTable<Match>('matches');
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new MatchesService();
      // TODO: Prevent constructor?
    }
    return this.#instance;
  }

  getAllMatches() {
    return this.#matches;
  }

  createMatch(home: Match['home'], away: Match['away'], winner: Match['winner']) {
    const id = String(Date.now() * Math.random());
    const newMatch = { id, home, away, winner };
    this.#matches.push(newMatch);
    return newMatch;
  }

  deleteMatch(id: Match['id']) {
    const index = this.#matches.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error(`Cannot find match with id "${id}"`);
    }

    const match = this.#matches[index];
    this.#matches = this.#matches.filter(t => t.id !== id);
    return match;
  }
}
