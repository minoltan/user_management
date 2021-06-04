import {Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import { Cryptography } from 'src/app/Classes/Cryptography';
import { Storage } from 'src/app/Enums/Storage';
import {ModalBox} from "./Classes/ModalBox";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'User Management';

  constructor(){}

  ngOnInit(): void {
  }

}
