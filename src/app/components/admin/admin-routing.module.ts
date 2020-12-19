import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCarsComponent } from './components/admin-cars/admin-cars.component';
import { AdminAddCarComponent } from './components/admin-add-car/admin-add-car.component';
import { AdminEditCarComponent } from './components/admin-edit-car/admin-edit-car.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { AdminFilesComponent} from './components/admin-files/admin-files.component';
import { AdminGroupComponent} from './components/admin-group/admin-group.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'cars', component: AdminCarsComponent },
      { path: 'add-car', component: AdminAddCarComponent},
      { path: 'edit-car', component: AdminEditCarComponent},
      { path: 'files', component: AdminFilesComponent},
      { path: 'group', component: AdminGroupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }