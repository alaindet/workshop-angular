import { Injectable, signal } from '@angular/core';

import { MOCK_ITEMS } from '@/mocks/items';
import { TodoItem } from '@/types/item';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  items = signal<TodoItem[]>(MOCK_ITEMS);
  selectedItem = signal<TodoItem | null>(null);

  selectItem(id: TodoItem['id']) {
    const item = this.items().find(t => t.id === id)!;
    // if (!item) return;
    this.selectedItem.set(item);
  }

  clearSelecteItem() {
    this.selectedItem.set(null);
  }

  createItem(name: TodoItem['name']) {
    const id = String(Date.now() + Math.random());
    const newItem: TodoItem = { id, name, isDone: false };
    this.items.mutate(items => items.unshift(newItem)); // <-- mutate
  }

  editItem(id: TodoItem['id'], name: TodoItem['name']) {
    this.items.update(items => items.map(item => {
      return (item.id === id) ? { ...item, name } : item;
    }));
  }

  toggleItem(id: TodoItem['id']) {
    this.items.mutate(items => {
      const index = items.findIndex(t => t.id === id);
      // if (index === -1) return;
      items[index].isDone = !items[index].isDone;
    });
  }

  removeItem(id: TodoItem['id']) {
    this.items.update(items => items.filter(t => t.id !== id));
  }
}
