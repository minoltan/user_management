import { Component, OnInit } from '@angular/core';
import {ApiPaths} from "../Enums/API_Paths";
import {APIService} from "../Services/api.service";
import {HttpParams} from "@angular/common/http";
import {GlobalPasserService} from "../Services/global-passer.service";
import {ActivatedRoute} from "@angular/router";

class Profile{
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public avatar:any;


  constructor(id: number, first_name: string, last_name: string, email: string, avatar: any) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
  }
}
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public brand:any= '';
  public user:any={'avatar': 'https://reqres.in/img/faces/5-image.jpg', 'first_name':''}
  public userId:any = 1;
  profile:Profile = <Profile>{};

  constructor(private apiService: APIService, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(parameter => {
      console.log(parameter.userId)
      this.userId = "" + parameter.userId;
      this.GetUserAPI();
    });
  }

  //region API
  GetUserAPI(){

    this.apiService.GetRequest("" + ApiPaths.getUserAPI+""+this.userId).subscribe(response => {
      if (response) {
        console.log(response)
        this.profile = response.data;
        console.log(this.profile)
      }
      else{
        console.log("Network error")
      }
    }, error => {
      console.log("Network error")
    });
  }
  //endregion

}
