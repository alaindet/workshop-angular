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

  isRunning = signal(false);
  buttonText = computed(() => this.isRunning() ? 'Stop' : 'Start');
  clock = signal(0);
  elapsed = computed(() => `${(this.clock() ?? 0) + 1} seconds have passed`);
  tickingEffect = effect(() => console.log(`Tic tac: ${this.elapsed()}`));

  ngOnDestroy() {
    console.log('Cleaning up clock vanilla...');
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStartStop() {
    const wasRunning = this.isRunning();
    this.isRunning.update(isRunning => !isRunning);

    if (wasRunning) {
      this.stop$.next();
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
