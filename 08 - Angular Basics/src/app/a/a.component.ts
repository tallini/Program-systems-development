import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {

  constructor() {
    console.log('constructor called.');
  }

  ngOnInit(): void {
    console.log('ngOnInit called.');
  }

}
