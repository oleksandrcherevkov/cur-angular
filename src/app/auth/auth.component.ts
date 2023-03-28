import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';
import { Login } from '../shared/services/auth/login.model';
import { Register } from '../shared/services/auth/register.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  public showLogin$ = new BehaviorSubject<boolean>(true);
  public switchLogin(state: boolean) {
    this.showLogin$.next(state);
  }

  constructor(private authService: AuthService, private toastr: ToastrService) {

  }

  public login(data: Login) {
    this.authService.login(data).pipe(
      tap(() => this.toastr.success('Logged successfuly.'))
    ).subscribe();
  }

  public register(data: Register) {
    this.authService.register(data).pipe(
      tap(() => this.toastr.success('Registered successfuly.'))
    ).subscribe();
  }
}
