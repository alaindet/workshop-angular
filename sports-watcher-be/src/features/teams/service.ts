import { loadDatabaseTable } from '../../common/utils';
import { Team } from '../../types';

export class TeamsService {

  static #instance: TeamsService;
  #teams!: Team[]; // The "database"

  constructor() {
    this.#teams = loadDatabaseTable<Team>('teams');
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new TeamsService();
      // TODO: Prevent constructor?
    }
    return this.#instance;
  }

  getAllTeams() {
    return this.#teams;
  }

  createTeam(id: Team['id'], name: Team['name']): Team {
    const newTeam = { id, name };
    const existing = this.#teams.find(t => t.id === id);

    if (existing) {
      throw new Error(`A team with id "${id}" already exists`);
    }

    this.#teams.push(newTeam);
    return newTeam;
  }

  deleteTeam(id: Team['id']): Team {
    const index = this.#teams.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error(`Cannot find team with id "${id}"`);
    }

    const team = this.#teams[index];
    this.#teams = this.#teams.filter(t => t.id !== id);
    return team;
  }
}
