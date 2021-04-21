import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  email?: string;
  password?: string;

  // Angular Services
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  navigateToUsersPage() {
    this.userService.login(this.email, this.password).subscribe(userData => {
      console.log(userData);
      this.router.navigateByUrl('/users');
    });
  }

}
