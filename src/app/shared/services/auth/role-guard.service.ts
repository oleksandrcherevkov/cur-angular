import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    if (this.authService.token$.value === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
