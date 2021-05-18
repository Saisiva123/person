import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css']
})
export class SelectionListComponent implements OnInit {

  @Input() listOfSymptomMessages:any;
  showRemaining:boolean=false;
  viewTxt:string;
  selectedVal:string;
  submitted:boolean=false
  
  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.listOfSymptomMessages? console.log(this.listOfSymptomMessages):null;
    this.viewTxt="View More";
  }
  showMore()
  {
    this.showRemaining=!this.showRemaining;
    this.showRemaining==true?this.viewTxt="View Less":this.viewTxt="View More";
  }
  selectedSymptom(val)
  {
    console.log(val)
    this.selectedVal=val;
    this.submitted=true;
    this.chatService.getBotRes(this.listOfSymptomMessages.nextIdReq)
  }


}
