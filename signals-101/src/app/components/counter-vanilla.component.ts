import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-vanilla',
  standalone: true,
  host: { class: 'demo-box' },
  template: `
    <h2>Vanilla (Zone.js)</h2>

    <button type="button" (click)="onDecrement()">-1</button>
    <button type="button" (click)="onIncrement()">+1</button>
    <span>{{ counter }}</span>
    <span>(x2 = {{ double }})</span>
    <span>(x3 = {{ triple }})</span>
  `,
})
export class CounterVanillaComponent {

  counter = 0;
  double = 0;
  triple = 0;

  onDecrement() {
    this.updateCounter(this.counter - 1);
  }

  onIncrement() {
    this.updateCounter(this.counter + 1);
  }

  private updateCounter(val: number) {
    this.counter = val;
    this.double = val * 2;
    this.triple = val * 3;
  }
}
