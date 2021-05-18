import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  name:string;
  constructor() { }

  ngOnInit(): void {
  }

}
