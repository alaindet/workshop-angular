import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

type Person = {
  name: string;
  age: number;
};

type PersonWithFriend = Person & { friend: Person };

const imports = [
  NgIf,
  NgFor,
];

@Component({
  selector: 'app-people',
  standalone: true,
  imports,
  host: { class: 'demo-box' },
  template: `
    <h2>People</h2>
    <button (click)="onAddPerson()">Add person</button>
    <button (click)="onIncrementAllPeopleAges()">All people +1 age</button>
    <button (click)="onIncrementAllFriendsAges()">All friends +1 age</button>
    <div class="demo-inner-box">
      <ul *ngIf="people().length">
        <li *ngFor="let person of people()">
          {{ person.name }} ({{ person.age }}),
          <span *ngIf="person?.friend as friend">
            {{ friend.name }} ({{ friend.age }})
          </span>
        </li>
      </ul>
    </div>
  `,
})
export class PeopleComponent {

  people = signal<PersonWithFriend[]>([]);

  onAddPerson() {
    const friend: Person = { name: 'Friend', age: 20 };
    const person: PersonWithFriend = { name: 'Person', age: 20, friend };

    // this.people.set([...this.people(), person]);
    // this.people.update(people => [...people, person]);
    this.people.mutate(people => people.push(person));
  }

  onIncrementAllPeopleAges() {
    // // With immutability
    // this.people.update(people => people.map(person => {
    //   return {
    //     ...person,
    //     age: person.age + 1,
    //   };
    // }));

    // With mutability
    this.people.mutate(people => people.forEach(person => {
      person.age += 1;
    }));
  }

  onIncrementAllFriendsAges() {
    // // With immutability
    // this.people.update(people => people.map(person => {
    //   return {
    //     ...person,
    //     friend: {
    //       ...person.friend,
    //       age: person.friend.age + 1,
    //     },
    //   };
    // }));

    // With mutability
    this.people.mutate(people => people.forEach(person => {
      person.friend.age += 1;
    }));
  }
}
