import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, EMPTY, Observable, catchError, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$ = new BehaviorSubject<User | null>(null);
  private url = `${environment.apiUrl}/users`;
  constructor(private client: HttpClient, private router: Router) {
  }

  public update(): Observable<User> {
    return this.client.get<User>(`${this.url}`)
      .pipe(
        tap((user) => this.user$.next(user)),
        catchError(_ => {
          this.router.navigate(['/auth']);
          return EMPTY;
        })
      );
  }
}
