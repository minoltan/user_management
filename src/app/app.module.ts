import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{MatSidenavModule} from '@angular/material/sidenav';
import{MatListModule} from '@angular/material/list';
import{MatIconModule} from '@angular/material/icon';
import{MatToolbarModule} from '@angular/material/toolbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';


//Custom Components
import { ClientParentComponent } from './Client/client-parent/client-parent.component';

//TODO: Remove Following Test Components
import { TestComponent } from './Admin/test/test.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { LoginComponent } from './Admin/login/login.component';
import { FooterComponent } from './Admin/footer/footer.component';
import { NavigationComponent } from './Client/navigation/navigation.component';
import { HeaderComponent } from './Client/header/header.component';
import { ClientFooterComponent } from './Client/client-footer/client-footer.component';
import { ManagementComponent } from './Admin/management/management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientParentComponent,

    //TODO: Remove Following Test Components
    TestComponent,
    AdminComponent,
    LoginComponent,
    FooterComponent,
    NavigationComponent,
    HeaderComponent,
    ClientFooterComponent,
    ManagementComponent,
    UserManagementComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
