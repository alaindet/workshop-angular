import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { aspectsClose } from '@ng-icons/ux-aspects';

import { TodoFormComponent } from '@/components/todo-form/todo-form.component';
import { TodosListComponent } from '@/components/todos-list/todos-list.component';
import { TodosService } from '@/services/todos.service';
import { UiService } from '@/services/ui.service';

aspectsClose

const imports = [
  NgIf,
  NgIconComponent,
  TodoFormComponent,
  TodosListComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [provideIcons({ aspectsClose })],
})
export class AppComponent {
  todosService = inject(TodosService);
  uiService = inject(UiService);
}
