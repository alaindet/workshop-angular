import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

const imports = [
  AsyncPipe,
];

@Component({
  selector: 'app-counter-subject',
  standalone: true,
  imports,
  host: { class: 'demo-box' },
  template: `
    <h2>BehaviorSubject</h2>

    <button type="button" (click)="onDecrement()">-1</button>
    <button type="button" (click)="onIncrement()">+1</button>
    <span>{{ counter | async }}</span>
    <span>(x2 = {{ double | async }})</span>
    <span>(x3 = {{ triple | async }})</span>
  `,
})
export class CounterSubjectComponent implements OnDestroy {

  counter = new BehaviorSubject(0);
  double = this.counter.pipe(map(counter => counter * 2));
  triple = this.counter.pipe(map(counter => counter * 3));

  ngOnDestroy() {
    this.counter.complete();
  }

  onDecrement() {
    this.counter.next(this.counter.value - 1);
  }

  onIncrement() {
    this.counter.next(this.counter.value + 1);
  }
}
