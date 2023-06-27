import { NgIf } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, startWith, Subject, takeUntil } from 'rxjs';

const imports = [
  NgIf,
];

@Component({
  selector: 'app-clock-destroyref',
  standalone: true,
  imports,
  host: { class: 'demo-box' },
  template: `
    <h2>Clock <code>DestroyRef</code></h2>
    <button (click)="onStartStop()">{{ buttonText() }}</button>
    <div *ngIf="isRunning()" class="demo-inner-box">{{ elapsed() }}</div>
  `,
})
export class ClockDestroyRefComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  private destroy$ = new Subject<void>();
  private stop$ = new Subject<void>();

  CLOCK_OFF_VALUE = -42;
  clock = signal(this.CLOCK_OFF_VALUE);
  isRunning = computed(() => this.clock() !== this.CLOCK_OFF_VALUE);
  buttonText = computed(() => this.isRunning() ? 'Stop' : 'Start');
  elapsed = computed(() => `${(this.clock() ?? 0) + 1} seconds have passed`);
  tickingEffect = effect(() => console.log(`Tic tac: ${this.elapsed()}`));

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      console.log('Cleaning up clock DestroyRef...');
      this.destroy$.next();
      this.destroy$.complete();
    });
  }

  onStartStop() {

    if (this.isRunning()) {
      this.stop$.next();
      this.clock.set(this.CLOCK_OFF_VALUE);
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
