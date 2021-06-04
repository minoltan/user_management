import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientParentComponent } from 'src/app/Client/client-parent/client-parent.component';
import { TestComponent } from './Admin/test/test.component';
import { ManagementComponent } from './Admin/management/management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from 'src/app/Classes/auth_guard';
import { LoginComponent } from './Admin/login/login.component';
import { AdminComponent } from './Admin/admin/admin.component';
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routes: Routes = [
  //Client View
  {path: '', component: UserManagementComponent},
  {path: 'userDetail/:userId', component: UserDetailComponent},
  //Todo: routing with url params

  //Admin View
  {path: 'dashboard',component:AdminComponent,
    children: [
      {path: 'menu1', component: TestComponent, canActivate:[AuthGuard], outlet: 'dashboard_menu'},
      {path: 'management', component: ManagementComponent, canActivate:[AuthGuard], outlet: 'dashboard_menu'},
      {path: '', component: TestComponent,canActivate:[AuthGuard],outlet: 'dashboard_menu'}
    ]
  },
  {path: 'dashboard/login', component: LoginComponent},

  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  //Call the Component Name
  ClientParentComponent,
  UserManagementComponent,
  UserDetailComponent,
  TestComponent,
  ManagementComponent,
  LoginComponent,

]
