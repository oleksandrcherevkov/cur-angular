import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from './login.model';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { Register } from './register.model';
import { LoginResponce } from './login-recponce.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtLocation = 'token';
  private url = `${environment.apiUrl}/auth`;
  constructor(private client: HttpClient, private userService: UserService) {
  }

  public get jwt(): string | null {
    return localStorage.getItem(this.jwtLocation);
  }

  private set jwt(token: string | null) {
    if (token) {
      localStorage.setItem(this.jwtLocation, token);
    } else {
      localStorage.removeItem(this.jwtLocation);
    }
  }

  public login(data: Login): Observable<LoginResponce> {
    let responce: LoginResponce;
    return this.client.post<LoginResponce>(`${this.url}/login`, data)
      .pipe(
        tap(res => {
          this.jwt = res.token;
          responce = res;
        }),
        switchMap(_ => this.userService.update()),
        map(_ => responce),
      );
  }

  public register(data: Register): Observable<void> {
    return this.client.post<void>(`${this.url}/register`, data);
  }
}
