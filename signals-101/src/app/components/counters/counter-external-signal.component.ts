import { Component, signal, computed, Signal } from '@angular/core';

@Component({
  selector: 'app-counter-external-signal',
  standalone: true,
  host: { class: 'demo-box' },
  template: `
    <h2>External Signals</h2>

    <div class="demo-inner-box">
      <h3>Counter 1</h3>
      <button type="button" (click)="counter1.decrement()">-1</button>
      <button type="button" (click)="counter1.increment()">+1</button>
      <span>{{ counter1.current() }}</span>
      <span>(x2 = {{ counter1.double() }})</span>
      <span>(x3 = {{ counter1.triple() }})</span>
    </div>

    <div class="demo-inner-box">
      <h3>Counter 2</h3>
      <button type="button" (click)="counter2.decrement()">-1</button>
      <button type="button" (click)="counter2.increment()">+1</button>
      <span>{{ counter2.current() }}</span>
      <span>(x2 = {{ counter2.double() }})</span>
      <span>(x3 = {{ counter2.triple() }})</span>
    </div>
  `,
})
export class CounterExternalSignalComponent {

  counter1 = useCounter(0);
  counter2 = useCounter(42);
}

function useCounter(initialValue: number) {

  const current = signal(initialValue);
  const double = useCounterMultiplied(current, 2);
  const triple = useCounterMultiplied(current, 3);

  function decrement() {
    current.update(c => c - 1);
  }

  function increment() {
    current.update(c => c + 1);
  }

  return {
    current,
    double,
    triple,
    decrement,
    increment,
  };
}

function useCounterMultiplied(counter: Signal<number>, factor: number) {
  return computed(() => counter() * factor);
}
