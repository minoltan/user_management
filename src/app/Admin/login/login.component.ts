import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter,OnInit } from '@angular/core';

import { Router } from '@angular/router';

//FormBuilder
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//API Service
import { APIService } from 'src/app/Services/api.service';

//Toast Library
import { ToastrService } from 'ngx-toastr';

//Crypto Class
import { Cryptography } from 'src/app/Classes/Cryptography';

//Local Storage
import { Storage } from 'src/app/Enums/Storage';

import { Output } from '@angular/core';

//API Paths
import { ApiPaths } from 'src/app/Enums/API_Paths';

//Toast Class
import { Toast } from 'src/app/Classes/Toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loginStatus = new EventEmitter<boolean>();

  //FormBuilder
  loginForm!: FormGroup;
  submitted = false;

  //Username or PW error
  public errorStatus: boolean = false;
  public errorMessage: string = "";

  private toastObj: Toast = new Toast(this.toastr);
  public cryptoObj: Cryptography = new Cryptography();

  constructor(private formBuilder: FormBuilder, private apiService: APIService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.InitializeFormBuilder();
  }

  //#region Form Builder
  InitializeFormBuilder(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }
  //endregion

  //region Function
  OnSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.LoginAPI();
    }
  }

  StoreLoginResponseInStorage(response: any){
    localStorage.setItem(Storage.ROLE, "" + this.cryptoObj.EncryptData(response.role));
    localStorage.setItem(Storage.TOKEN, "" + this.cryptoObj.EncryptData(response.token));
    localStorage.setItem(Storage.USERID, "" + this.cryptoObj.EncryptData(response.userID));
    localStorage.setItem(Storage.LASTCLEAR, "" + this.cryptoObj.EncryptData((new Date()).getTime()));
  }
  //endregion

  //#region API
  LoginAPI(){
    let toastID = this.toastObj.ToastWait();
    let username = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    this.apiService.GetRequest_RequestParam(ApiPaths.loginAPI, params).subscribe(response => {
      this.toastObj.ToastManualClose(toastID);
      if (response.responseCode == 200) {
        this.StoreLoginResponseInStorage(response.data[0]);
        this.loginForm.reset();
        this.submitted = false;
        this.toastObj.ToastSuccess(response.successMessage);
        this.loginStatus.emit(true);
        this.router.navigate(['/dashboard']);
      }
      else {this.toastObj.ToastError(response.errorMessage);}
    }, error => {
      this.toastObj.ToastManualClose(toastID);
      this.toastObj.ToastError(error);
    });
  }
  //endregion
}
