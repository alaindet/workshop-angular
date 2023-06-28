import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

import { TodoItem } from '@/types/item';
import { ICONS_PROVIDER } from './icons';
import { fromEvent } from 'rxjs';

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

  @ViewChild('removeDialogRef', { static: true })
  removeDialogRef!: ElementRef<HTMLDialogElement>;

  isRemoveDialogOpen = signal(false);
  #removingItemId!: TodoItem['id'] | null;

  ngOnInit() {
    this.listenToRemoveDialogClosed();
  }

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
    this.#removingItemId = itemId;
    this.removeDialogRef.nativeElement.showModal();
  }

  private listenToRemoveDialogClosed(): void {
    const dialog = this.removeDialogRef.nativeElement;
    fromEvent<Event>(dialog, 'close').subscribe(event => {

      // Can also be accessed from target
      // const dialogEl = event?.target as HTMLDialogElement;

      if (dialog.returnValue === 'yes') {
        this.removedItem.emit(this.#removingItemId!);
      }

      this.#removingItemId = null;
    });
  }
}
