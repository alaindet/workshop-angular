import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../../components';

const imports = [
  RouterOutlet,
  NavbarComponent,
];

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports,
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
})
export class LoggedLayoutComponent {

}
