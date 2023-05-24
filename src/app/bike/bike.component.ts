import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { Bike } from '../shared/services/bike/bike.model';
import { BikeService } from '../shared/services/bike/bike.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss']
})
export class BikeComponent implements OnInit {
  bike$ = new BehaviorSubject<Bike | null>(null);
  url = window.location.href;
  findBike = (id: string) => this.bikeSerive.getById(id).pipe(
    tap(bike => this.bike$.next(bike)),
    tap(_ => this.url = window.location.href),
    catchError(_ => EMPTY),
  );
  constructor(private route: ActivatedRoute, private router: Router, private bikeSerive: BikeService) { }
  ngOnInit() {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const bikeIdString = params.get('id');
        if (bikeIdString) {
          return this.findBike(bikeIdString);
        } else {
          return EMPTY;
        }
      }),
    ).subscribe();
  }

  onFind(id: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: id,
      },
      queryParamsHandling: 'merge',
    });
  }
}
