import { Component, inject } from '@angular/core';

import { TodoFormComponent } from '@/components/todo-form/todo-form.component';
import { TodosListComponent } from '@/components/todos-list/todos-list.component';
import { TodosService } from '@/services/todos.service';
import { UiService } from '@/services/ui.service';

const imports = [
  TodoFormComponent,
  TodosListComponent,
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  todosService = inject(TodosService);
  uiService = inject(UiService);
}
