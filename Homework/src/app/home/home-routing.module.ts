import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'appointments',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage, 
    children: [
      {
        path: 'appointments',
            loadChildren: () => import('../appointments/appointments.module').then(m => m.AppointmentsPageModule)
      },
      {
        path: 'user',
            loadChildren: () => import('../user/user.module').then(m => m.UserPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
