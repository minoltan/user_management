import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSidenav} from "@angular/material/sidenav";
import {GlobalPasserService} from "../../Services/global-passer.service";
import {ToastrService} from "ngx-toastr";
import {APIService} from "../../Services/api.service";

//API Paths
import { ApiPaths } from 'src/app/Enums/API_Paths';

//Local Storage
import { Storage } from 'src/app/Enums/Storage';

//Toast Class
import { Toast } from 'src/app/Classes/Toast';

//Modal Class
import { ModalBox } from 'src/app/Classes/ModalBox';

//Form Builder Class
import { FormBuilderValidater } from 'src/app/Classes/FormBuilderValidater';

//Crypto Class
import { Cryptography } from 'src/app/Classes/Cryptography';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

class Profile{
  public name: string;
  public gender:string;
  public email: string;
  public phone: string;
  public image:any;

  constructor(name: string, gender: string, email: string, phone: string, image: any) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.image = image;
  }
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //Todo: Delete the url once image received
  imageSrc: string ='../../../assets/Bin/profile.jpg';

  //Side Navigation
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  @Output() loginStatus = new EventEmitter<boolean>();

  //FormBuilder
  profile:Profile = <Profile>{};
  profileEditForm!: FormGroup;
  passwordEditForm!: FormGroup;
  submitted = false;
  private image: any;
  fieldTextType: boolean = false;
  public confirmPasswordType:boolean = false;

  public isExpanded: boolean = true;
  public showSubmenu: boolean = false;
  public isShowing: boolean = false;
  public showSubSubMenu: boolean = false;

  //Body Navigation ID
  public navigationID: any;

  public password: string = "";
  public profileid: any;
  public profileHeader:string = "Edit Profile";

  // Edit profile status
  public isProfile: boolean = true;
  public isPassword: boolean = false;
  public Gender: any = ['Male','Female', 'Prefer not to say'];

  private toastObj: Toast = new Toast(this.toastr);
  private modalObj: ModalBox = new ModalBox(this.modalService);
  public formBuilderValidatorObj: FormBuilderValidater = new FormBuilderValidater();
  public cryptoObj: Cryptography = new Cryptography();

  constructor(private modalService: NgbModal,private router:Router,private  route: ActivatedRoute,private globalPasser: GlobalPasserService, private formBuilder: FormBuilder, private toastr: ToastrService, private apiService: APIService) { }

  ngOnInit(): void {
    this.ProfileInitAPI();
    this.globalPasser.currentnavigationID.subscribe(response => {
      this.navigationID = response;
    }, error => {
      this.navigationID = 0;
    });

    this.router.navigate([{ outlets: { dashboard_menu: ['menu1'] } }],
    { relativeTo: this.route });
  }

  //region Profile Edit Form
  InitializeProfileFormBuilder(){
    this.profileEditForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      file: ['']
    }, {
      validator: [
        this.formBuilderValidatorObj.SpaceValidation('firstName'),
        this.formBuilderValidatorObj.PhoneNumberValidation('phone')
      ]
    });

    this.ProfileInitAPI();
  }

  BindProfileForm(profile:any){
    //Todo: Once response get bind here
    this.profileEditForm.setValue(
      {
        firstName: 'Minoltan',
        gender: 'Male',
        phone: '077934799',
        email: 'issackpaul94@gmail.com',
        file: ''
      }
    )
  }

  AssignProfileFormValues(){
    this.profile = this.profileEditForm.value;
    this.profile.image = "";
  }

  get profileFormControl() {
    return this.profileEditForm.controls;
  }

  get gender() {
    return this.profileEditForm.get('gender');
  }

  ChangeDropDownValue(controlName: any, e: any){
    let value = e.target.value;

    if(value.includes(':')){
      let index = value.indexOf(':');
      value = value.substring(index + 2);
    }

    controlName?.setValue(value, {
      onlySelf: true
    });
  }
  //endregion

  //region Password Change Form
  InitializePasswordFormBuilder() {
    this.passwordEditForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: [
        this.formBuilderValidatorObj.MustMatch('password', 'confirmPassword')
      ]
    });
  }


  get passwordFormControl() {
    return this.passwordEditForm.controls;
  }
  //endregion


  //region Function
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = !this.confirmPasswordType;
  }

  onFileChange(event:any) {
    this.image = event.target.files[0];
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.profileEditForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  onProfileSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileEditForm.invalid) {
      return;
    }
    else {
        this.ProfileEditAPI();
    }
  }

  onPasswordSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.passwordEditForm.invalid) {
      return;
    }
    else {
        this.PasswordEditAPI()
    }
  }

  Signout() {
    localStorage.removeItem(Storage.TOKEN);
    localStorage.removeItem(Storage.USERID);
    localStorage.removeItem(Storage.LASTCLEAR);
    this.modalObj.CloseModel();
    this.loginStatus.emit(false);
    location.reload();
  }

  Profile(){
    this.profileHeader = "Edit Profile"
    this.submitted = false;
    this.isPassword = false;
    this.isProfile = true;
  }

  Password(){
    this.profileHeader = "Edit Password"
    this.submitted = false;
    this.isPassword = true;
    this.isProfile = false;
  }
  //endregion

  //region API
  ProfileInitAPI(){
    this.apiService.GetRequest("" + ApiPaths.profileLoadAPI).subscribe(response => {

      if (response.responseCode == 200) {
        this.imageSrc = response.image;
        this.BindProfileForm(response);
      }
      else{
        console.log("Network error")
      }
    }, error => {
      console.log("Network error")
    });
  }

  ProfileEditAPI()  {
    this.AssignProfileFormValues();

    let toastID = this.toastObj.ToastWait();

    this.apiService.PostRequest("" + ApiPaths.profileEditApi, JSON.stringify(this.profile)).subscribe(response => {
      this.toastObj.ToastManualClose(toastID);

      if (response.responseCode == 200) {
        this.toastObj.ToastSuccess(response.successMessage);
      }
      else{
        this.toastObj.ToastError(response.errorMessage);
      }
    }, error => {
      this.submitted = false;
      this.toastObj.ToastManualClose(toastID);
      this.toastObj.ToastError(error);
    });
  }

  PasswordEditAPI() {
    this.profileid = this.cryptoObj.DecryptData(localStorage.getItem(Storage.USERID));
    let toastID = this.toastObj.ToastWait();

    let params = new HttpParams()
      .set('id', this.profileid)
      .set('password', this.passwordEditForm.value.password);

    this.apiService.GetRequest_RequestParam(ApiPaths.passwordUpdateApi, params).subscribe(response => {
      this.toastObj.ToastManualClose(toastID);
      if (response.responseCode == 200) {
        this.submitted = false;
        this.password = "";
        this.toastObj.ToastSuccess(response.successMessage);

        this.modalObj.CloseModel();
      }
      else {
        this.toastObj.ToastError(response.errorMessage);
      }
    }, error => {
      this.toastObj.ToastManualClose(toastID);
      this.toastObj.ToastError(error);
    });
  }
  //endregion

  //region Validations
  SpaceValidation(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors.emptySpace) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value.trim().length == 0) {
        control.setErrors({ emptySpace: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  phoneNumberValidation(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors.mustMatchPattern) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      const pattern = /^(0|94|\+94|0094)[0-9]{9}$/;

      if (!pattern.test(control.value)) {
        control.setErrors({ mustMatchPattern: true });
      }
      else {
        control.setErrors(null);
      }
    }
  }
  //endregion

  //region Modal box
  profileEditModal(content: any) {
    this.InitializeProfileFormBuilder();
    this.InitializePasswordFormBuilder();

    this.modalObj.OpenModel(content, this.modalObj.Get_Medium());
  }

  SignOutModal(content: any) {
    this.modalObj.OpenModel(content, this.modalObj.Get_Medium());
  }
  //endregion

  ChangeBodyComponents(navID: any){
    this.globalPasser.ChangeNavigationID(navID);
  }

}


//Todo: Get user response and decrypt
//Todo: Hide management if user change
