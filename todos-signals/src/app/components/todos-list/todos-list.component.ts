import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

import { TodoItem } from '@/types/item';
import { ICONS_PROVIDER } from './icons';

const imports = [
  NgIf,
  NgFor,
  NgTemplateOutlet,
  NgIconComponent,
];

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports,
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  viewProviders: [ICONS_PROVIDER],
})
export class TodosListComponent {

  @Input({ required: true }) items!: TodoItem[];

  @Output() toggledItem = new EventEmitter<TodoItem['id']>();
  @Output() selectedItem = new EventEmitter<TodoItem['id']>();
  @Output() removedItem = new EventEmitter<TodoItem['id']>();

  onToggleItem(itemId: TodoItem['id'], event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.toggledItem.emit(itemId);
  }

  onEditItem(itemId: TodoItem['id'], event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.selectedItem.emit(itemId);
  }

  onRemoveItem(itemId: TodoItem['id'], event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.removedItem.emit(itemId);
  }
}
