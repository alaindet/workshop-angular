import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild, signal } from '@angular/core';

import { TodoItem } from '@/types/item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

export type TodoItemEdited = {
  id: TodoItem['id'];
  name: TodoItem['name'];
};

const imports = [
  NgIf,
  ReactiveFormsModule, // <-- Note
];

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports,
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {

  @Input({ required: true }) item!: TodoItem | null;

  @Output() created = new EventEmitter<TodoItem['name']>();
  @Output() edited = new EventEmitter<TodoItemEdited>();
  @Output() deselected = new EventEmitter<void>();

  @ViewChild('nameInputRef', { static: true })
  nameInputRef!: ElementRef<HTMLInputElement>;

  isEditing = signal(false);

  theForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  /**
   * In future maybe:
   * item = input({ required: true });
   * isEditing = computed(!!this.item());
   */
  ngOnChanges(changes: SimpleChanges) {
    const itemC = changes['item'];
    if (itemC.firstChange || itemC.previousValue !== itemC.currentValue) {
      this.itemChanged();
    }
  }

  onDeselect() {
    this.deselected.emit();
    this.theForm.reset();
    this.nameInputRef.nativeElement.focus();
  }

  onSubmit() {

    if (this.theForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const name = this.theForm.value.name ?? '';

    if (!name) {
      console.log('Invalid name');
      return;
    }

    if (this.isEditing()) {
      const id = this.item!.id;
      this.edited.emit({ id, name });
      this.theForm.reset();
      this.nameInputRef.nativeElement.focus();
      return;
    }

    this.created.emit(name);
    this.theForm.reset();
    this.nameInputRef.nativeElement.focus();
  }

  private itemChanged() {

    const isEditing = this.item !== null;
    this.isEditing.set(isEditing);

    if (isEditing) {
      const name = this.item!.name;
      this.theForm.patchValue({ name });
      return;
    }

    const name = '';
    this.theForm.patchValue({ name });
  }
}
