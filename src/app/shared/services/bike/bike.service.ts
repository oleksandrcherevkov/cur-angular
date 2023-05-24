import { Observable } from "rxjs";
import { Bike } from "./bike.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private url = `${environment.apiUrl}/bikes`;
  private rentUrl = `${environment.apiUrl}/tickets`;
  constructor(private client: HttpClient) {
  }

  public getAll(lon: number, lat: number, raius: number): Observable<Bike[]> {
    return this.client.get<Bike[]>(`${this.url}?lon=${lon}&lat=${lat}&radius=${raius}`);
  }

  public getById(id: string): Observable<Bike> {
    return this.client.get<Bike>(`${this.url}/${id}`);
  }

  public create(): Observable<Bike> {
    return this.client.post<Bike>(`${this.url}`, {});
  }

  public activate(id: string): Observable<Bike> {
    return this.client.patch<Bike>(`${this.url}/${id}/activate`, {});
  }

  public repair(id: string): Observable<Bike> {
    return this.client.patch<Bike>(`${this.url}/${id}/repair`, {});
  }

  public waste(id: string): Observable<Bike> {
    return this.client.delete<Bike>(`${this.url}/${id}`, {});
  }

  public rent(id: string): Observable<void> {
    return this.client.post<void>(`${this.rentUrl}/${id}`, {});
  }

  public close(id: string): Observable<void> {
    return this.client.delete<void>(`${this.rentUrl}/${id}`, {});
  }
}