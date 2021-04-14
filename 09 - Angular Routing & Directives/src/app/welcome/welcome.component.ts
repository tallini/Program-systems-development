import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // Angular Services
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToUsersPage() {
    this.router.navigateByUrl('/users');
  }

}
