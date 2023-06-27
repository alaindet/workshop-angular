import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function sameTeamValidator(formGroup: AbstractControl): ValidationErrors | null {

  const controls = formGroup as FormGroup;
  const home = controls.get('home')!.value;
  const away = controls.get('away')!.value;


  if (home === away) {
    return {
      sameTeam: 'Home and away team cannot be the same!',
    }
  }

  return null;
}
