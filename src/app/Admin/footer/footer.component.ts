import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public amiTechMail: string = "mailto: amitechsoftwaresolution@gmail.com";
  public amiTechContact: string = "076 227 7991";
  public copyRights: string = "All copyrights reserved by Demo Software Solutions";

  constructor() { }

  ngOnInit(): void {
  }

  GetCurrentYear(){
    var dateObj = new Date();
    return dateObj.getFullYear();
  }
}

