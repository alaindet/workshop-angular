import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';

import {
  CounterVanillaComponent,
  CounterSubjectComponent,
  CounterSignalComponent,
  CounterExternalSignalComponent,
} from './components/counters';

import { PeopleComponent } from './components/people.component';

import {
  ClockVanillaComponent,
  ClockDestroyRefComponent,
  ClockTakeUntilDestroyComponent,
  ClockExternalComponent,
} from './components/clocks';

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
  ClockExternalComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports,
  host: { class: 'demo-boxes' },
  template: `
    <h1>Signals 101</h1>

    <h2>Counters</h2>
    <app-counter-vanilla />
    <app-counter-subject />
    <app-counter-signal />
    <app-counter-external-signal />

    <h2>People</h2>
    <app-people />

    <h2>Clocks</h2>
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

    <!-- Clock external -->
    <button type="button" (click)="onToggleClock('external')">
      {{ clocks()['external'] ? 'Close' : 'Open' }} external clock
    </button>
    <app-clock-external *ngIf="clocks()['external']" />
  `,
})
export class AppComponent {

  clocks = signal<{ [clockName: string]: boolean }>({
    vanilla: false,
    destroyref: false,
    takeuntildestroy: false,
    external: false,
  });

  onToggleClock(clockName: string) {
    this.clocks.mutate(clocks => {
      clocks[clockName] = !clocks[clockName];
    });
  }
}
