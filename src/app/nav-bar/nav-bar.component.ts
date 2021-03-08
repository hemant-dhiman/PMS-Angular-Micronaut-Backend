import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Users } from '../users/Users';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  currentUser: Users;
  cUser = new Subject();
  constructor() {}

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.currentUser);
    // console.log(!!this.currentUser);
  }
}
