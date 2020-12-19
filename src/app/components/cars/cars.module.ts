// reports.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { CarsComponent } from './cars-view/cars.component';
import { CarsRoutingModule } from './cars-routing.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CarsRoutingModule
    ],
    declarations: [CarsComponent]
})
export class CarsModule { }