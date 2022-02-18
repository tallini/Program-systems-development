import { Component, OnInit } from '@angular/core';
import * as users_data from '../data/users.json';
import { User } from '../model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // structural directives: *ngIf, *ngSwitch, *ngFor
  // attribute directives

  users?: User[];
  chosenUser?: User;

  constructor() { }

  ngOnInit(): void {
    this.users = users_data.users;
  }

  openDetails(user: User) {
    this.chosenUser = user;
  }

  receiveUser(event: any) {
    console.log(event);
  }

}
