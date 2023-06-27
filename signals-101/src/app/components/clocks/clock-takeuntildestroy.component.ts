import { NgIf } from '@angular/common';
import { Component, computed, effect, signal, runInInjectionContext, EnvironmentInjector, inject } from '@angular/core';
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
  // But you still need stop$

  private stop$ = new Subject<void>();
  private injector = inject(EnvironmentInjector); // <-- Not great

  CLOCK_OFF_VALUE = -42;
  clock = signal(this.CLOCK_OFF_VALUE);
  isRunning = computed(() => this.clock() !== this.CLOCK_OFF_VALUE);
  buttonText = computed(() => this.isRunning() ? 'Stop' : 'Start');
  elapsed = computed(() => `${(this.clock() ?? 0) + 1} seconds have passed`);
  tickingEffect = effect(() => console.log(`Tic tac: ${this.elapsed()}`));

  // No ngOnDestroy!
  // But you can't run custom login on destroy

  onStartStop() {

    if (this.isRunning()) {
      this.stop$.next();
      this.clock.set(this.CLOCK_OFF_VALUE);
      return;
    }

    runInInjectionContext(this.injector, () => { // <-- Not great 2
      interval(1000).pipe(
        takeUntilDestroyed(), // <-- That's great!
        takeUntil(this.stop$),
        startWith(-1),
      ).subscribe(t => {
        this.clock.set(t);
      });
    });
  }
}
