import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-big-button',
  templateUrl: './big-button.component.html',
  styleUrls: ['./big-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigButtonComponent {
  @Input() disabled: boolean = false;
  @Output() clickEvent = new EventEmitter();

  onClick() {
    this.clickEvent.emit();
  }
}
