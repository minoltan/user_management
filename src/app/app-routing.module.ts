import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserManagementComponent } from './user-management/user-management.component';
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routes: Routes = [
  {path: '', component: UserManagementComponent},
  {path: 'userDetail/:userId', component: UserDetailComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  //Call the Component Name
  UserManagementComponent,
  UserDetailComponent,

]
