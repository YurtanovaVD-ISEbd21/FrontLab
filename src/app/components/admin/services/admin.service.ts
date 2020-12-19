import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Car{
    model: string;
    price: number;
}

@Injectable()
export class AdminService{
  
    constructor(private http: HttpClient){ }
    baseUrl: string = 'http://localhost:8000/car_sharing_api/cars';

    getData(){
        return this.http.get(this.baseUrl + '/')
    }

    delete(id : number) {
        return this.http.delete(this.baseUrl + '/' + id)
    }
}