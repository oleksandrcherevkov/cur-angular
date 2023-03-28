import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.userService.user$.value != null) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

  canLoad(): boolean {
    if (this.userService.user$.value != null) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
