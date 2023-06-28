import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoItem } from '@/types/item';

export type TodoItemEdited = {
  id: TodoItem['id'];
  name: TodoItem['name'];
};

@Component({
  selector: 'app-todo-form',
  standalone: true,
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {

  @Input({ required: true }) item!: TodoItem | null;

  @Output() created = new EventEmitter<TodoItem['name']>();
  @Output() edited = new EventEmitter<TodoItemEdited>();
}
