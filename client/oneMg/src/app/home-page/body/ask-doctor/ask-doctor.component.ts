import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ask-doctor',
  templateUrl: './ask-doctor.component.html',
  styleUrls: ['./ask-doctor.component.css']
})
export class AskDoctorComponent implements OnInit {

  enableLaunchIcon:boolean=true;
  enableChatWindow:boolean=false;
  

  constructor() { }

  ngOnInit(): void {
    
  }
  toggleLaunchIcon($event)
  {
    this.enableLaunchIcon=$event;
    this.enableChatWindow=!this.enableLaunchIcon;
  }
  disableLaunchIcon()
  {
    this.enableChatWindow=true; 
    this.enableLaunchIcon=!this.enableChatWindow;
  }
}
