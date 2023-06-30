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
  ClockEffectComponent,
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
  ClockEffectComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports,
  host: { class: 'demo-boxes' },
  templateUrl: './app.component.html',
})
export class AppComponent {

  clocks = signal<{ [clockName: string]: boolean }>({
    vanilla: false,
    destroyref: false,
    takeuntildestroy: false,
    external: false,
    effect: false,
  });

  onToggleClock(clockName: string) {
    this.clocks.mutate(clocks => {
      clocks[clockName] = !clocks[clockName];
    });
  }
}
