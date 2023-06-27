import { Component, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter-signal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'demo-box' },
  template: `
    <h2>Signals</h2>

    <button type="button" (click)="onDecrement()">-1</button>
    <button type="button" (click)="onIncrement()">+1</button>
    <span>{{ counter() }}</span>
    <span>(x2 = {{ double() }})</span>
    <span>(x3 = {{ triple() }})</span>
  `,
})
export class CounterSignalComponent {

  counter = signal(0);
  double = computed(() => this.counter() * 2);
  triple = computed(() => this.counter() * 3);

  someEffect$ = effect(() => {
    console.log(`Counter changed: ${this.counter()}`);
  });

  onDecrement() {
    this.counter.update(counter => counter - 1);
  }

  onIncrement() {
    this.counter.update(counter => counter + 1);
  }
}
