import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @Input() btnMessages:any;
  selectedOptions={
    selected:false,
    selectedVal:""
  }

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    console.log(this.btnMessages)
  }
  selectedBtn(val,selectedItem)
  {
    this.selectedOptions.selected=true;
    this.selectedOptions.selectedVal=selectedItem;
    this.chatService.getBotRes(val.nextIdReq);
  }

}
