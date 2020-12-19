import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../../cars/services/car.service';
import { Car } from '../../../cars/models/car.module';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-edit-car',
  templateUrl: './admin-edit-car.component.html',
  styleUrls: ['./admin-edit-car.component.less'],
  providers: [CarService],
})
export class AdminEditCarComponent implements OnInit {
  car: Car;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private carService: CarService) { }

  ngOnInit() {
    const carId = window.localStorage.getItem('editCarId');
    if (!carId) {
      alert('Действие запрещено');
      this.router.navigate(['cars']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      model: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.carService.get(+carId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.carService.update(this.editForm.value)
      .pipe(first())
      .subscribe(data => {
            alert('Данные успешно изменены');
            this.router.navigate(['admin', 'cars']);
      });
  }
}
