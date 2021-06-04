import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormBuilderValidater} from "../../Classes/FormBuilderValidater";
import {ApiPaths} from "../../Enums/API_Paths";
import {Toast} from "../../Classes/Toast";
import {ToastrService} from "ngx-toastr";
import {APIService} from "../../Services/api.service";
import {ModalBox} from "../../Classes/ModalBox";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Storage} from "../../Enums/Storage";
import {Cryptography} from "../../Classes/Cryptography";

class Profile{
  public firstName: string;
  public gender:string;
  public email: string;
  public phone: string;
  public password:string;
  public role:string;


  constructor(firstName: string, gender: string, email: string, phone: string, password:string,role:string) {
    this.firstName = firstName;
    this.gender = gender;
    this.role = role;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  public cryptoObj: Cryptography = new Cryptography();

  //region Profile Create Form
  profile:Profile = <Profile>{};
  profileCreateForm!: FormGroup;
  private image: any;
  imageSrc: string ='';
  fieldTextType: boolean = false;
  public confirmPasswordType:boolean = false;
  public formBuilderValidatorObj: FormBuilderValidater = new FormBuilderValidater();
  private modalObj: ModalBox = new ModalBox(this.modalService);
  submitted = false;
  public Gender: any = ['Male','Female', 'Prefer not to say'];
  public Role: any = ['ADMIN','MANAGER'];
  public User:any = [];
  public userRole:any = '';
  public currentUserID:any = '';
  //endregion

  private toastObj: Toast = new Toast(this.toastr);

  constructor(private modalService: NgbModal,private formBuilder: FormBuilder, private toastr: ToastrService, private apiService: APIService) { }

  ngOnInit(): void {
    this.InitializeProfileFormBuilder();
    this.GetAllUsers();
    this.GetProfileDetails()

  }

  //region Forms
  //region Profile Create Form
  InitializeProfileFormBuilder(){
    this.profileCreateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [
        this.formBuilderValidatorObj.SpaceValidation('firstName'),
        this.formBuilderValidatorObj.PhoneNumberValidation('phone'),
        this.formBuilderValidatorObj.MustMatch('password', 'confirmPassword')
      ]
    });
  }

  get profileFormControl() {
    return this.profileCreateForm.controls;
  }
  get gender() {
    return this.profileCreateForm.get('gender');
  }
  get role() {
    return this.profileCreateForm.get('role');
  }
  //endregion

  //endregion

  //region Functions
  //region Profile
  GetProfileDetails(){
    this.userRole = this.cryptoObj.DecryptData(localStorage.getItem(Storage.ROLE))
  }

  onFileChange(event:any) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.profileCreateForm.patchValue({
          fileSource: reader.result
        });
      };
    }
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

  imageCloseClick(){
    this.imageSrc = '';
    this.image;
  }

  onProfileSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileCreateForm.invalid) {
      return;
    }
    else {
      this.ProfileCreateAPI();
    }
  }

  AssignProfileFormValues(){
    this.profile = this.profileCreateForm.value;
    // this.profile.image = this.image;
    console.log(this.profile);
    console.log(this.image);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = !this.confirmPasswordType;
  }
  //endregion

  //region User
  GetAllUsers(){
    this.GetAllUserAPI()
  }

  GetSingleUser(userID: any) {
    let index = this.User.findIndex((obj: any) => obj.adminId == userID);
    return this.User[index];
  }

  BindUserForm(user:any){
    console.log(user)
    //Todo: Once password response get bind here
    this.profileCreateForm.setValue(
      {
        firstName: user.name,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
        role: user.role,
        password: 'user.password',
        confirmPassword:'user.password'
      }
    )
  }

  DeleteUser(){
    this.DeleteUserAPI()
  }
  //endregion

  //endregion

  //region API
  ProfileCreateAPI()  {
    this.AssignProfileFormValues();
    let toastID = this.toastObj.ToastWait();
    let formdata: FormData = new FormData();
    formdata.append('name', this.profile.firstName);
    formdata.append('email', this.profile.email);
    formdata.append('phone', this.profile.phone);
    formdata.append('gender', this.profile.gender);
    formdata.append('role', this.profile.role);
    formdata.append('password', this.profile.password);
    if(this.image) {formdata.append('file', this.image)};



    this.apiService.PostRequest_Multipart("" + ApiPaths.profileCreateApi, formdata).subscribe(response => {
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

  GetAllUserAPI(){
    this.apiService.GetRequest("" + ApiPaths.getAllUsersAPI).subscribe(response => {
      if (response.responseCode == 200) {
        this.User= response.data[0];
      }
      else{
        console.log("Network error")
      }
    }, error => {
      console.log("Network error")
    });
  }

  DeleteUserAPI(){

  }
  //endregion

  //region Modal Box
  CreateUserModal(content:any){
    this.submitted = false;
    this.modalObj.OpenModel(content, this.modalObj.Get_Large());
  }

  DeleteUserModal(content: any, userID:any) {
    this.currentUserID = this.GetSingleUser(userID).userID;
    this.modalObj.OpenModel(content, this.modalObj.Get_Medium());
  }

  EditUserModal(content: any,userID: any) {
    this.submitted = false;
    this.BindUserForm(this.GetSingleUser(userID));
    this.modalObj.OpenModel(content, this.modalObj.Get_Large());
  }
  //endregion

}

//Todo: Get all users (super admin, admin can get all users)
//Todo: Delete users (user cant delete the own id, super admin can have delete access)
