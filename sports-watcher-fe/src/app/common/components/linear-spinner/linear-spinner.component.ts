import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-linear-spinner',
  standalone: true,
  template: `<div class="_bar"><div>`,
  styleUrls: ['./linear-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-linear-spinner' },
})
export class LinearSpinnerComponent {
  @Input() @HostBinding('class.-fixed') fixed = true;
}
