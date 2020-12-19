import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../cars/services/car.service';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-admin-add-car',
  templateUrl: './admin-add-car.component.html',
  styleUrls: ['./admin-add-car.component.less'],
  providers: [CarService]
})
export class AdminAddCarComponent implements OnInit {
  addForm: FormGroup;
  editor = ClassicEditor;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      model: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit() {
      const formData = this.addForm.value;
      formData.authorId = +formData.authorId;
      this.carService.create(formData).subscribe(data => {
        alert('Данные успешно добавлены');
        this.router.navigate(['admin', 'cars']);
      });
  }
}
