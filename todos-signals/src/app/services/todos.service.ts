import { Injectable, signal } from '@angular/core';

import { MOCK_ITEMS } from '@/mocks/items';
import { TodoItem } from '@/types/item';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  items = signal<TodoItem[]>(MOCK_ITEMS);
  selectedItem = signal<TodoItem | null>(null);

  toggleItem(itemId: TodoItem['id']) {
    this.items.mutate(items => {
      const index = items.findIndex(t => t.id === itemId);
      if (index === -1) return;
      items[index].isDone = !items[index].isDone;
    });
  }

  selectItem(itemId: TodoItem['id']) {
    const item = this.items().find(t => t.id === itemId);
    if (!item) return;
    this.selectedItem.set(item);
  }

  clearSelecteItem() {
    this.selectedItem.set(null);
  }
}
