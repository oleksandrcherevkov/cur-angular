import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user/user.service';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user$ = this.user.user$;
  constructor(private user: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.user.update()
      .pipe(
        switchMap(_ => this.router.navigate(['map'])),
      )
      .subscribe();
  }
}
