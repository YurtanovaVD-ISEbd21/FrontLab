import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../cars/services/car.service';
import { Car } from '../../../cars/models/car.module';

import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.less'],
  providers: [CarService]
})

export class AdminCarsComponent implements OnInit {

  cars: Car[];

  constructor(private router: Router, private carService: CarService) { }

  ngOnInit() {
    this.carService.getData().subscribe(data => this.cars=data);
  }

  delCar(id:number) {
    this.carService.delete(id).subscribe(data => {
      alert('Данные успешно удалены');
      this.cars = this.cars.filter(b => b.id !== id);
    });
  }

  editCar(id:number) {
    window.localStorage.removeItem('editCarId');
    window.localStorage.setItem('editCarId', id.toString());
    this.router.navigate(['admin', 'edit-car']);
  }
}
