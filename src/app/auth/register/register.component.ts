import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/shared/services/auth/register.model';
import { Role } from 'src/app/shared/services/auth/role.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  @Output() register = new EventEmitter<Register>();

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl(Role.User, [Validators.required]),
  });
  public hide = true;
  public roles = Role;

  public submit() {
    const register: Register = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      role: this.form.value.role!,
    };
    this.register.emit(register);
  }
}
