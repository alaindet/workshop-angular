import { Pipe, PipeTransform } from '@angular/core';

import { Team } from '@app/features/teams';
import { Match } from '../../types';

export type ResultBadge = {
  cssClass: string;
  label: string;
};

@Pipe({
  name: 'appResultBadge',
  standalone: true,
  pure: true,
})
export class ResultBadgePipe implements PipeTransform {
  transform(match: Match, team: Team): ResultBadge {
    if (match.winner === null) {
      return { label: 'DRAW', cssClass: 'bg-secondary' };
    }

    if (match.winner === team.id) {
      return { label: 'WIN', cssClass: 'bg-success' };
    }

    return { label: 'LOSS', cssClass: 'bg-danger' };
  }
}
