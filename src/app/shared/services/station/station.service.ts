import { environment } from "src/environments/environment";
import { Station } from "./station.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private url = `${environment.apiUrl}/stations`;
  constructor(private client: HttpClient) {
  }

  public getAll(lon: number, lat: number, raius: number): Observable<Station[]> {
    return this.client.get<Station[]>(`${this.url}?lon=${lon}&lat=${lat}&raius=${raius}`);
  }
}