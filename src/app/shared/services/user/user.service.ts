import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$ = new BehaviorSubject<User | null>(null);
  private url = `${environment.apiUrl}/users`;
  constructor(private client: HttpClient) {
  }

  public update(): Observable<User> {
    return this.client.get<User>(`${this.url}`)
      .pipe(tap((user) => this.user$.next(user)))
  }
}
