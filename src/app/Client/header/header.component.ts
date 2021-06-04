import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public User:any= [];

  @Output() hrefID = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getNavEmit(href:any){
    this.hrefID.emit(href);
  }
}
