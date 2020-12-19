// reports.module.ts
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

// containers
import { AdminComponent } from './components/admin/admin.component';
import { AdminCarsComponent } from './components/admin-cars/admin-cars.component';
import { AdminAddCarComponent } from './components/admin-add-car/admin-add-car.component';
import { AdminEditCarComponent } from './components/admin-edit-car/admin-edit-car.component';
import { AdminFilesComponent } from './components/admin-files/admin-files.component';
import { AdminGroupComponent } from './components/admin-group/admin-group.component';


@NgModule({
    imports: [
        CommonModule,
        CKEditorModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminComponent,
        AdminCarsComponent,
        AdminAddCarComponent,
        AdminEditCarComponent,
        AdminFilesComponent,
        AdminGroupComponent
    ]
})
export class AdminModule { }