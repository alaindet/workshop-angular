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

  private destroy$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);
  private stop$ = new Subject<void>();

  isRunning = signal(false);
  buttonText = computed(() => this.isRunning() ? 'Stop' : 'Start');
  clock = signal(0);
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
