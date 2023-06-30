import { NgIf } from '@angular/common';
import { Component, computed, effect, OnDestroy, signal } from '@angular/core';
import { interval, startWith, Subject, takeUntil } from 'rxjs';

const imports = [
  NgIf,
];

@Component({
  selector: 'app-clock-vanilla',
  standalone: true,
  imports,
  host: { class: 'demo-box' },
  template: `
    <h2>Clock Vanilla</h2>
    <button (click)="onStartStop()">{{ buttonText() }}</button>
    <div *ngIf="isRunning()" class="demo-inner-box">{{ elapsed() }}</div>
  `,
})
export class ClockVanillaComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  private stop$ = new Subject<void>();

  CLOCK_OFF = -42;
  clock = signal(this.CLOCK_OFF);
  isRunning = computed(() => this.clock() !== this.CLOCK_OFF);
  buttonText = computed(() => this.isRunning() ? 'Stop' : 'Start');
  elapsed = computed(() => `${(this.clock() ?? 0) + 1} seconds have passed`);
  tickingEffect = effect(() => console.log(`Tic tac: ${this.elapsed()}`));

  ngOnDestroy() {
    console.log('Cleaning up clock vanilla...');
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStartStop() {

    if (this.isRunning()) {
      this.stop$.next();
      this.clock.set(this.CLOCK_OFF);
      return;
    }

    interval(1000).pipe(
      takeUntil(this.destroy$),
      takeUntil(this.stop$),
      startWith(-1),
    ).subscribe(t => {
      this.clock.set(t);
    });
  }
}
