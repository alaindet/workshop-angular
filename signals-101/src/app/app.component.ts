import { Component, signal } from '@angular/core';

import { CounterVanillaComponent } from './components/counter-vanilla.component';
import { CounterSubjectComponent } from './components/counter-subject.component';
import { CounterSignalComponent } from './components/counter-signal.component';
import { CounterExternalSignalComponent } from './components/counter-external-signal.component';
import { PeopleComponent } from './components/people.component';
import { ClockVanillaComponent } from './components/clock-vanilla.component';
import { ClockDestroyRefComponent } from './components/clock-destroyref.component';
import { ClockTakeUntilDestroyComponent } from './components/clock-takeuntildestroy.component';
import { NgIf } from '@angular/common';

const imports = [
  NgIf,
  CounterVanillaComponent,
  CounterSubjectComponent,
  CounterSignalComponent,
  CounterExternalSignalComponent,
  PeopleComponent,
  ClockVanillaComponent,
  ClockDestroyRefComponent,
  ClockTakeUntilDestroyComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports,
  host: { class: 'demo-boxes' },
  template: `
    <app-counter-vanilla />
    <app-counter-subject />
    <app-counter-signal />
    <app-counter-external-signal />

    <app-people />

    <!-- Clock vanilla -->
    <button type="button" (click)="onToggleClock('vanilla')">
      {{ clocks()['vanilla'] ? 'Close' : 'Open' }} vanilla clock
    </button>
    <app-clock-vanilla *ngIf="clocks()['vanilla']" />

    <!-- Clock DestroyRef -->
    <button type="button" (click)="onToggleClock('destroyref')">
      {{ clocks()['destroyref'] ? 'Close' : 'Open' }} DestroyRef clock
    </button>
    <app-clock-destroyref *ngIf="clocks()['destroyref']" />

    <!-- Clock takeUntilDestroy() -->
    <button type="button" (click)="onToggleClock('takeuntildestroy')">
      {{ clocks()['takeuntildestroy'] ? 'Close' : 'Open' }} takeUntilDestroy() clock
    </button>
    <app-clock-takeuntildestroy *ngIf="clocks()['takeuntildestroy']" />
  `,
})
export class AppComponent {

  clocks = signal<{ [clockName: string]: boolean }>({
    vanilla: false,
    destroyref: false,
    takeuntildestroy: false,
  });

  onToggleClock(clockName: string) {
    this.clocks.mutate(clocks => {
      clocks[clockName] = !clocks[clockName];
    });
  }
}
