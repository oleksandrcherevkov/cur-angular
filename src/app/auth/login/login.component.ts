import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/shared/services/auth/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Output() login = new EventEmitter<Login>();

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public hide = true;

  public submit() {
    const login: Login = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };
    this.login.emit(login);
  }
}
