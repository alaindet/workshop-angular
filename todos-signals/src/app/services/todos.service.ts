import { Injectable, inject, signal } from '@angular/core';

import { MOCK_ITEMS } from '@/mocks/items';
import { TodoItem } from '@/types/item';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  private uiService = inject(UiService);

  items = signal<TodoItem[]>(MOCK_ITEMS);
  selectedItem = signal<TodoItem | null>(null);

  selectItem(id: TodoItem['id']) {
    const item = this.items().find(t => t.id === id)!;
    // if (!item) return;
    this.selectedItem.set(item);
    this.uiService.addNotification(`Selected item "${item.name}"`);
  }

  clearSelecteItem() {
    this.selectedItem.set(null);
    this.uiService.addNotification('Cleared selected item');
  }

  createItem(name: TodoItem['name']) {
    const id = String(Date.now() + Math.random());
    const newItem: TodoItem = { id, name, isDone: false };
    this.items.mutate(items => items.unshift(newItem)); // <-- mutate
    this.uiService.addNotification(`Created item "${newItem.name}"`);
  }

  editItem(id: TodoItem['id'], name: TodoItem['name']) {
    this.items.update(items => items.map(item => {
      return (item.id === id) ? { ...item, name } : item;
    }));
    this.selectedItem.set(null);
    this.uiService.addNotification(`Edited item "${name}"`);
  }

  toggleItem(id: TodoItem['id']) {
    let action!: string;
    let name!: string;
    this.items.mutate(items => {
      const index = items.findIndex(t => t.id === id);
      // if (index === -1) return;
      name = items[index].name;
      const isDone = items[index].isDone;
      action = isDone ? 'Undone' : 'Completed';
      items[index].isDone = !isDone;
    });
    this.uiService.addNotification(`${action} item "${name}"`);
  }

  removeItem(id: TodoItem['id']) {

    let name!: string;
    this.items.update(items => {
      const item = items.find(t => t.id === id)!;
      name = item.name;
      return items.filter(t => t.id !== id);
    });

    this.uiService.addNotification(`Removed item "${name}"`);
  }
}
