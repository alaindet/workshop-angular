import { NgIf } from '@angular/common';
import { Component, OnDestroy, computed, effect, signal } from '@angular/core';

const CLOCK_OFF = -42;
const CLOCK_SHOULD_START = -21;

const imports = [
  NgIf,
];

@Component({
  selector: 'app-clock-effect',
  standalone: true,
  imports,
  host: { class: 'demo-box' },
  template: `
    <h2>Clock with effect</h2>
    <button (click)="onStartStop()">{{ buttonText() }}</button>
    <div *ngIf="isRunning()" class="demo-inner-box">{{ elapsed() }}</div>
  `,
})
export class ClockEffectComponent implements OnDestroy {

  private timer: ReturnType<typeof setInterval> | null = null;

  clock = signal(CLOCK_OFF);
  isRunning = computed(() => this.clock() !== CLOCK_OFF);
  buttonText = computed(() => this.isRunning() ? 'Stop' : 'Start');
  elapsed = computed(() => `${(this.clock() ?? 0) + 1} seconds have passed`);

  clockEffect = effect(() => {
    switch (this.clock()) {
      case CLOCK_OFF:
        if (this.timer) clearInterval(this.timer);
        break;
      case CLOCK_SHOULD_START:
        this.clock.set(-1);
        this.timer = setInterval(() => this.clock.update(c => c + 1), 1000);
        break;
    }
  }, { allowSignalWrites: true });

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  onStartStop() {
    this.clock.update(c => c === CLOCK_OFF ? CLOCK_SHOULD_START : CLOCK_OFF);
  }
}
