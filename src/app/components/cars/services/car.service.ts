import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.module';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class CarService{
    private apiUrl = `${environment.apiUrl}/car_sharing_api/cars`;

    constructor(private http: HttpClient){ }
      
    getData(): Observable<Car[]>{
        return this.http.get<Car[]>(`${this.apiUrl}/`).pipe(
            map(data => data.map(item => new Car().deserialize(item)))
          );
    }

    get(id : number): Observable<Car> {
        return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
            map(data => new Car().deserialize(data))
        );
    }

    create(car : Car): Observable<Response> {
        return this.http.post<Response>(`${this.apiUrl}/`, car)
    }

    update(car : Car): Observable<Response> {
        return this.http.put<Response>(`${this.apiUrl}/${car.id}`, car)
    }

    delete(id : number): Observable<Response> {
        return this.http.delete<Response>(`${this.apiUrl}/${id}`)
    }

    search(query: string): Observable<Car[]> {
        return this.http.get<Car[]>(`${this.apiUrl}/?q=${query.trim()}`).pipe(
          map(data => data.map(item => new Car().deserialize(item)))
        );
      }
}