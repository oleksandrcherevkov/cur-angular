import { Observable } from "rxjs";
import { Bike } from "./bike.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.apiUrl}/bikes`;
  constructor(private client: HttpClient) {
  }

  public getAll(lon: number, lat: number, raius: number): Observable<Bike[]> {
    return this.client.get<Bike[]>(`${this.url}?lon=${lon}&lat=${lat}&raius=${raius}`);
  }
}