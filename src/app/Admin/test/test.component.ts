import {Component, OnInit, Output, EventEmitter} from '@angular/core';

//Toast Library
import { ToastrService } from 'ngx-toastr';

//Toast Class
import { Toast } from 'src/app/Classes/Toast';

//Model Library
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Modal Class
import { ModalBox } from 'src/app/Classes/ModalBox';

//Crypto Class
import { Cryptography } from 'src/app/Classes/Cryptography';

//API Service
import { APIService } from 'src/app/Services/api.service';

//HTTP Request Param
import { HttpParams } from '@angular/common/http';

//FormBuilder
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Form Builder Class
import { FormBuilderValidater } from 'src/app/Classes/FormBuilderValidater';

//Router
import { ActivatedRoute } from '@angular/router';

//API Paths
import { ApiPaths } from 'src/app/Enums/API_Paths';

//Pagination Class
import { Pagination } from 'src/app/Classes/Pagination';

//Class Declaration
class SampleClass {
  public variable1: string;
  public variable2: number;

  constructor(variable1: string, variable2: number) {
    this.variable1 = variable1;
    this.variable2 = variable2;
  }
}

//Enum Declaration
enum Search {
  API_CALL_IN_PROCESS,
  NO_CONTENT,
  HAVE_CONTENT
}

//Form
class Form{
  public name: string;
  public gender:string;
  public email: string;
  public phone: string;
  public city: string;
  public password: string;
  public image:any;

  constructor(name: string, gender: string, email: string, phone: string, city: string, password: string, image: any) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.password = password;
    this.image = image;
  }
}

//Payhere Class
class PayHereModel{
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;
  public address: string;
  public city: string;
  public country: string;
  public order_id: any;
  public items: string;
  public currency: string;
  public amount:number;


  constructor(first_name: string, last_name: string, email: string, phone: string, address: string, city: string, country: string, order_id: any, items: string, currency: string, amount: number) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.order_id = order_id;
    this.items = items;
    this.currency = currency;
    this.amount = amount;
  }
}

class OrderRequestModel{
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;
  public address: string;
  public city: string;
  public country: string;
  public order_id: any;
  public items: string;
  public currency: string;
  public amount:number;


  constructor(first_name: string, last_name: string, email: string, phone: string, address: string, city: string, country: string, order_id: any, items: string, currency: string, amount: number) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.order_id = order_id;
    this.items = items;
    this.currency = currency;
    this.amount = amount;
  }
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  // Output the values to parent component
  @Output() passValue = new EventEmitter<string>();

  //region Samples
  public sampleClass: SampleClass = <SampleClass>{};
  public sampleArray: SampleClass[] = [
    {variable1: 'sample1', variable2: 5},
    {variable1: 'sample2', variable2: 15},
    {variable1: 'sample3', variable2: 20}
  ];
  public dataArray: String[] = ["A", "B"];
  //endregion

  //region Form
  private image: any;
  public form:Form = <Form> {};
  public uploadedFile:string = '';
  public fieldTextType: boolean = false;
  public confirmPasswordType:boolean = false;
  //endregion

  //region FormBuilder
  public sampleForm!: FormGroup;
  public submitted = false;
  public City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan', 'New York'];
  public Gender: any = ['Male','Female', 'Prefer Not to Say'];
  //endregion

  //region Encrypt
  public plainText1: string = '';
  public plainText2: string = '';
  public frontEncrypt: string = '';
  public backDecrypt : string = '';
  public backEncrypt: string = '';
  public frontDecrypt : string = '';
  //endregion

  //region Search
  public isDisplaySearchSection: boolean = false;
  public searchState: number = 0;
  public searchBodyText: string = "";
  public searchKeyWord: string = "";
  //endregion

  //region Objects Initialize
  private toastObj: Toast = new Toast(this.toastr);
  private modalObj: ModalBox = new ModalBox(this.modalService);
  public paginationObj: Pagination = new Pagination();
  public formBuilderValidatorObj: FormBuilderValidater = new FormBuilderValidater();
  public cryptoObj: Cryptography = new Cryptography();
  //endregion

  //region Payhere
  public payHereModel: PayHereModel = <PayHereModel>{};
  public orderRequestModel:OrderRequestModel = <OrderRequestModel>{};
  //endregion

  constructor(private toastr: ToastrService, private modalService: NgbModal, private apiService: APIService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.InitializedFormBuilder();
    this.ApiCallToLoadData(0, true);
  }

  //#region Form Functions
  InitializedFormBuilder(){
    this.sampleForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cityName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [
        this.formBuilderValidatorObj.MustMatch('password', 'confirmPassword'),
        this.formBuilderValidatorObj.SpaceValidation('firstName'),
        this.formBuilderValidatorObj.PhoneNumberValidation('phone')
      ]
    });
  }

  get formControl() {
    return this.sampleForm.controls;
  }

  get cityName() {
    return this.sampleForm.get('cityName');
  }

  get gender() {
    return this.sampleForm.get('gender');
  }

  ResetForm(){
    this.sampleForm.reset();
    this.submitted = false;
  }

  AssignFormValues(){
    this.form = this.sampleForm.value;
    this.form.image = "";
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.sampleForm.invalid) {
      return;
    }
    else {
      this.AssignFormValues();
      this.SubmitFormAPI();
    }
  }

  onEncryptSubmit(){
    this.SubmitEncryptAndDecryptBackendAPI(this.Encrypt(this.plainText1));
  }

  onDecryptSubmit(){
    this.SubmitPlainTextEncryptBackendEndAndDecryptFrontendAPI(this.plainText2);
  }
  //#endregion

  //#region Other Functions
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = !this.confirmPasswordType;
  }

  Search() {
    if (this.searchKeyWord == "" || this.searchKeyWord.trim().length == 0) {
      this.isDisplaySearchSection = false;
      return;
    }

    this.searchState = Search.API_CALL_IN_PROCESS;
    this.isDisplaySearchSection = true;

    this.SearchApi();
  }

  SelectDate(event:any){
    let choosedDate =  parseInt(event.toString().slice(8,10));
    let choosedMonth = parseInt(event.toString().charAt(6));
  }

  PassValueToParentComponent(value:string){
    this.passValue.emit(value);
  }

  CreateImageFile(event: any) {
    this.image = event.target.files[0];
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.uploadedFile = reader.result as string;

        this.sampleForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  GetObjectIndex(value: any) {
    //key: Variable name
    //value: Variable value
    return this.dataArray.findIndex((obj: any) => obj.key == value);
  }

  GetURLParam(){
    //Change "yourParameterName" like mentioned in app-routing.modules.ts
    this.route.params.subscribe(parameter => {
      let param = "" + parameter.yourParameterName;
    });
  }
  //#endregion

  //#region Api Calls
  ApiCallToLoadData(pageNumber: any, isNeedToCheckPagination: boolean) {
    //API Call Here
    let pageSize = this.paginationObj.Get_MaximumItemsPerPage();

    //Call inside response 200 section
    if (isNeedToCheckPagination) {
      this.paginationObj.Set_MaxPages(10);//Assign response Page count here
      this.paginationObj.AdjustPageCountToDisplay();
    }
  }

  SearchApi() {
    this.apiService.GetRequest(ApiPaths.testAPI + '/' + this.searchKeyWord).subscribe(response => {
      if (response.responseCode == 200) {

        if (this.dataArray.length === 0) {
          this.searchBodyText = 'SORRY! NO PRODUCTS AVAILABLE WITHIN YOUR SEARCHING AREA';
          this.searchState = Search.NO_CONTENT;

          setTimeout(() => {
            this.isDisplaySearchSection = false;
          }, 3000);
        }
        else {
          //Add stuffs here when API got a success response and returns data

          this.searchState = Search.HAVE_CONTENT;
        }
      }
      else {
        this.searchBodyText = "SORRY! SOMETHING WENT WRONG!";
        this.searchState = Search.NO_CONTENT;

        setTimeout(() => {
          this.isDisplaySearchSection = false;
        }, 3000);
      }
    }, error => {
      this.searchBodyText = "SORRY! SOMETHING WENT WRONG!";
      this.searchState = Search.NO_CONTENT;

      setTimeout(() => {
        this.isDisplaySearchSection = false;
      }, 3000);
    });
  }

  SampleAPICall() {
    let toastID = this.toastObj.ToastWait();

    //Use when you need a Request Param API Call
    let params = new HttpParams()
      .set('paramName1', 'paramValue1')
      .set('paramName2', 'paramValue2');

    //Change API call method according to your requirements
    //Do not call API address directly and use it from a variable as ashown below
    this.apiService.DeleteRequest(ApiPaths.testAPI).subscribe(response => {
      this.toastObj.ToastManualClose(toastID);

      if (response.responseCode == 200) {
        this.toastObj.ToastSuccess(response.successMessage);
      }
      else {
        this.CreateErrorToast(response.errorMessage);
      }
    }, error => {
      this.toastObj.ToastManualClose(toastID);
      this.toastObj.ToastError(error);
    });
  }

  SubmitFormAPI(){
    let toastID = this.toastObj.ToastWait();

    this.apiService.PostRequest("" + ApiPaths.testAPI, JSON.stringify(this.form)).subscribe(response => {
      this.toastObj.ToastManualClose(toastID);

      if (response.responseCode == 200) {
        // reset form
        this.toastObj.ToastSuccess(response.successMessage);
        this.ResetForm();
      }
      else{
        this.CreateErrorToast(response.errorMessage);
      }
    }, error => {
      this.toastObj.ToastManualClose(toastID);
      this.toastObj.ToastError(error);
    });
  }

  SubmitEncryptAndDecryptBackendAPI(encryptedData: any){
    let toastID = this.toastObj.ToastWait();
    let params = new HttpParams()
      .set('data',encryptedData);
    this.apiService.GetRequest_RequestParam(ApiPaths.decryptAPI, params).subscribe(response => {
      this.toastObj.ToastManualClose(toastID);
      if (response.responseCode == 200) {
        this.backDecrypt =  response.data
        this.toastObj.ToastSuccess(response.successMessage);
        this.ResetForm();
      }
      else{
        this.CreateErrorToast(response.errorMessage);
      }
    }, error => {
      this.toastr.remove(toastID);
      this.CreateErrorToast(error);
    });
  }

  SubmitPlainTextEncryptBackendEndAndDecryptFrontendAPI(plainText:any)  {
    let toastID = this.toastObj.ToastWait();
    let params = new HttpParams()
      .set('data',plainText);
    this.apiService.GetRequest_RequestParam(ApiPaths.encryptAPI, params).subscribe(response => {
      this.toastObj.ToastManualClose(toastID);
      if (response.responseCode == 200) {
        this.toastObj.ToastSuccess(response.successMessage);
        this.backEncrypt = response.data[0];
        this.Decrypt(response.data[0])
      }
      else {
        this.CreateErrorToast(response.errorMessage);
      }
    }, error => {
      this.toastr.remove(toastID);
    });
  }
  //#endregion

  //#region Calender
  CurrentDate(){
    var d = new Date();
    var n = d.getDate();
    return n;
  }

  CurrentCalender(){
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    let calender = curr_year + "-0" + curr_month + "-" + curr_date;
    return calender;
  }

  CurrentMonth(){
    var d = new Date();
    var m = d.getMonth()+1;
    return m;
  }
  //#endregion

  //#region Pagination
  ChangePage(value: number) {
    if(!this.paginationObj.CheckPageBoundryCondition(value)) return;

    this.paginationObj.ChangePage(value);
    this.ApiCallToLoadData(this.paginationObj.Get_CurrentPage()-1, false);
  }

  SelectPage(value: number, activeIndex: any) {
    this.paginationObj.SelectPage(value, activeIndex);
    this.ApiCallToLoadData(this.paginationObj.Get_CurrentPage()-1, false);
  }
  //#endregion

  //#region Modal Box
  public OpenModel(content: any) {
    this.modalObj.OpenModel(content, this.modalObj.Get_Medium());
  }

  //Do not call the function and call the inside algorithm
  private CloseModel(){
    this.modalObj.CloseModel();
  }
  //#endregion

  //#region Toast
  //Do not call the function and call the inside algorithm
  CreateToastWaiting() {
    let toastID = this.toastObj.ToastWait();
    // this.toastObj.ToastManualClose(toastID);TODO: CALL THIS WHEN NEED TO CLOSE THE TOAST
  }

  //Do not call the function and call the inside algorithm
  CreateSuccessToast(msg: string) {
    this.toastObj.ToastSuccess(msg);
  }

  //Do not call the function and call the inside algorithm
  CreateErrorToast(msg: string) {
    this.toastObj.ToastError(msg);
  }
  //#endregion

  //#region Cryptography
  //Do not call the function and call the inside algorithm
  Encrypt(data:any){
    return this.frontEncrypt = "" + this.cryptoObj.AesEncryptData(data);
  }

  //Do not call the function and call the inside algorithm
  Decrypt(data:any){
   return this.frontDecrypt = "" + this.cryptoObj.AesDecryptData(data);
  }
  //#endregion

  //#region Payhere
  PaymentType(type: string, modal:any){
    if(type === 'card') this.CallApiForPayHereModel(modal);
    else this.PayCashModel(modal);
  }

  CallApiForPayHereModel(modal:any){
    //if any validation provide here
    this.UpdateOrderInfo();
    this.PostCardOrder(modal);
  }

  UpdateOrderInfo(){
    this.orderRequestModel.order_id = "0";
    this.orderRequestModel.items = "Door bell wireless";
    this.orderRequestModel.currency = "LKR";
    this.orderRequestModel.amount = 1000;
    this.orderRequestModel.first_name = "Minoltan";
    this.orderRequestModel.last_name = "Issack";
    this.orderRequestModel.email = "issackpaul95@gmail.com";
    this.orderRequestModel.phone = "0719542277";
    this.orderRequestModel.address = "Mannar, Sri Lanka";
    this.orderRequestModel.country = "Sri Lanka";
  }

  PostCardOrder(modal:any){
    this.apiService.PostRequest(ApiPaths.postCardOrderAPI,  JSON.stringify(this.orderRequestModel)).subscribe(response =>
    {
      if (response.responseCode == 200) {
        this.payHereModel = response.data[0];
        let paymentValidationMessage = response.data[1];
        this.OpenModel(modal)
      }
      else {
        console.log(response.errorMessage);
      }
    }, error =>
    {
      console.log(error);
    });
  }

  ConfirmCash(){

  }

  PayCashModel(modal:any){
    this.OpenModel(modal)
  }

  Cancel(){
    this.CloseModel();
  }

  //endregion

  //#region Sample Test Case Function
  functionA(){
    return 10;
  }

  functionB(a: number, b: number){
    return a + b;
  }
  //#endregion
}

