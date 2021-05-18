import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ayurveda',
  templateUrl: './ayurveda.component.html',
  styleUrls: ['./ayurveda.component.css']
})
export class AyurvedaComponent implements OnInit {

  ayurvedaItems:Array<Ayurveda>;

  constructor() { }

  ngOnInit(): void {
    this.ayurvedaItems=[
      {
        id:1,
        name:"himalaya"
      },
      {
        id:2,
        name:"vedix"
      }
    ];
 
  }

}

interface Ayurveda
{
  id:number;
  name:string;
  price?:number;
}