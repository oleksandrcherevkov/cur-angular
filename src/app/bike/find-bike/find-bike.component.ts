import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-bike',
  templateUrl: './find-bike.component.html',
  styleUrls: ['./find-bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindBikeComponent {
  @Output() id = new EventEmitter<string>();
  idControl = new FormControl("", {
    validators: [Validators.required],
    nonNullable: true,
  });
  submit() {
    this.id.emit(this.idControl.value);
  }
}
