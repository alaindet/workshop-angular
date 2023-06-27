import { NgIf } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { interval, startWith, Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const imports = [
  NgIf,
];

@Component({
  selector: 'app-clock-takeuntildestroy',
  standalone: true,
  imports,
  host: { class: 'demo-box' },
  template: `
    <h2>Clock <code>takeUntilDestroy()</code></h2>
    <button (click)="onStartStop()">{{ buttonText() }}</button>
    <div *ngIf="isRunning()" class="demo-inner-box">{{ elapsed() }}</div>
  `,
})
export class ClockTakeUntilDestroyComponent  {

  // No custom subject!

  private stop$ = new Subject<void>();

  isRunning = signal(false);
  buttonText = computed(() => this.isRunning() ? 'Stop' : 'Start');
  clock = signal(0);
  elapsed = computed(() => `${(this.clock() ?? 0) + 1} seconds have passed`);
  tickingEffect = effect(() => console.log(`Tic tac: ${this.elapsed()}`));

  // No ngOnDestroy!

  onStartStop() {
    const wasRunning = this.isRunning();
    this.isRunning.update(isRunning => !isRunning);

    if (wasRunning) {
      this.stop$.next();
      return;
    }

    interval(1000).pipe(
      takeUntilDestroyed(), // <-- Here
      takeUntil(this.stop$),
      startWith(-1),
    ).subscribe(t => {
      this.clock.set(t);
    });
  }
}
