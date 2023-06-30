import { NgIf } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { interval, startWith, Subject, takeUntil } from 'rxjs';

const imports = [
  NgIf,
];

@Component({
  selector: 'app-clock-external',
  standalone: true,
  imports,
  host: { class: 'demo-box' },
  template: `
    <h2>Clock external</h2>

    <div class="demo-inner-box">
      <h3>Clock 1</h3>
      <button (click)="clock1.startStop()">{{ clock1.buttonText() }}</button>
      <div *ngIf="clock1.isRunning()" class="demo-inner-box">{{ clock1.elapsed() }}</div>
    </div>

    <div class="demo-inner-box">
      <h3>Clock 2</h3>
      <button (click)="clock2.startStop()">{{ clock2.buttonText() }}</button>
      <div *ngIf="clock2.isRunning()" class="demo-inner-box">{{ clock2.elapsed() }}</div>
    </div>
  `,
})
export class ClockExternalComponent {
  clock1 = createClock();
  tickingEffect1 = effect(() => {
    console.log(`[Clock1] Tic tac: ${this.clock1.elapsed()}`);
  });

  clock2 = createClock();
  tickingEffect2 = effect(() => {
    console.log(`[Clock2] Tic tac: ${this.clock2.elapsed()}`)
  });
}

function createClock() {

  const CLOCK_OFF = -42;
  const stop$ = new Subject<void>();
  const clock = signal(CLOCK_OFF);
  const isRunning = computed(() => clock() !== CLOCK_OFF);
  const buttonText = computed(() => isRunning() ? 'Stop' : 'Start');
  const elapsed = computed(() => `${clock() + 1} seconds have passed`);

  inject(DestroyRef).onDestroy(() => {
    console.log('Cleaning up clock external...');
    stop$.next();
    stop$.complete();
  });

  function startStop() {

    if (isRunning()) {
      stop$.next();
      clock.set(CLOCK_OFF);
      return;
    }

    interval(1000).pipe(takeUntil(stop$), startWith(-1))
      .subscribe(t => clock.set(t));
  }

  return {
    isRunning,
    buttonText,
    elapsed,
    startStop,
  };
}
