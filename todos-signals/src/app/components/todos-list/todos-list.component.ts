import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { TodoItem } from '@/types/item';

const imports = [
  NgIf,
  NgFor,
  NgTemplateOutlet,
];

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports,
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent {

  @Input({ required: true }) items!: TodoItem[];

  @Output() toggledItem = new EventEmitter<TodoItem['id']>();
  @Output() selectedItem = new EventEmitter<TodoItem['id']>();
  @Output() removedItem = new EventEmitter<TodoItem['id']>();

  onToggleItem(itemId: TodoItem['id']) {
    this.toggledItem.emit(itemId);
  }

  onEditItem(itemId: TodoItem['id']) {
    this.selectedItem.emit(itemId);
  }

  onRemoveItem(itemId: TodoItem['id']) {
    this.removedItem.emit(itemId);
  }
}
