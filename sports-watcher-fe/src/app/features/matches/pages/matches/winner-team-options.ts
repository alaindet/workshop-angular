import { FormOption } from '@app/common/types';

export enum WinnerTeam {
  Home = 'home',
  Away = 'away',
  Draw = 'draw',
}

export const WINNER_TEAM_OPTIONS: FormOption[] = [
  { value: WinnerTeam.Home, label: 'Home' },
  { value: WinnerTeam.Away, label: 'Away' },
  { value: WinnerTeam.Draw, label: 'Draw' },
];
