import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
 
  @Input() txtMessages:any;
 
  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    console.log(this.txtMessages);
  }
  clicked(val)
  {
    console.log(val);
    this.chatService.getBotRes(val.nextIdReq);
  }

}
