import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Role } from './role.model';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    if (this.userService.user$.value !== null && Role[this.userService.user$.value.role] === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
