import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from './login.model';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Register } from './register.model';
import { LoginResponce } from './login-recponce.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token$ = new BehaviorSubject<string | null>(null);
  private client: HttpClient;
  private url = `${environment.apiUrl}/auth`;
  constructor(client: HttpClient, private userService: UserService) {
    this.client = client;
  }

  public login(data: Login): Observable<LoginResponce> {
    return this.client.post<LoginResponce>(`${this.url}/login`, data)
      .pipe(
        tap(token => this.token$.next(token.token)),
        tap(_ => this.userService.update().subscribe()),
      );
  }

  public register(data: Register): Observable<void> {
    return this.client.post<void>(`${this.url}/register`, data);
  }
}