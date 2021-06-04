import { Component, OnInit } from '@angular/core';
import {ApiPaths} from "../Enums/API_Paths";
import {APIService} from "../Services/api.service";
import {Pagination} from "../Classes/Pagination";
import {GlobalPasserService} from "../Services/global-passer.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  public User:any=[];
  public paginationObj: Pagination = new Pagination();
  public dataArray: String[] = ["A", "B"];
  public maxPages:number = 0;

  constructor(private apiService: APIService, private globalPasser: GlobalPasserService) { }

  ngOnInit(): void {
    this.GetAllUsers()
  }

  ScrollToSelectedPosition(href: string){
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  //region Functions
  GetAllUsers(){
    this.GetAllUserAPI()
  }

  ChangeUserComponents(userID: any){
    this.globalPasser.ChangeNavigationID(userID);
  }
  //endregion

  //region API
  GetAllUserAPI(){
    this.apiService.GetRequest("" + ApiPaths.getAllUsersAPI).subscribe(response => {
      if (response) {
        console.log(response)
        this.User= response.data;
        this.maxPages = response.total_pages;
        this.ApiCallToLoadData(response.page, true);

      }
      else{
        console.log("Network error")
      }
    }, error => {
      console.log("Network error")
    });
  }

  ApiCallToLoadData(pageNumber: any, isNeedToCheckPagination: boolean) {
    //API Call Here
    let pageSize = this.paginationObj.Get_MaximumItemsPerPage();

    //Call inside response 200 section
    if (isNeedToCheckPagination) {
      this.paginationObj.Set_MaxPages(this.maxPages);//Assign response Page count here
      this.paginationObj.AdjustPageCountToDisplay();
    }
  }
  //endregion

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
}
