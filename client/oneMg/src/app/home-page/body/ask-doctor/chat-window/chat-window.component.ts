import { Component, OnInit, Output, EventEmitter, Input ,ElementRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @Output() disableChatWindow = new EventEmitter<boolean>();
  @Input() enableChatWindow: boolean;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  allTextResponses: any = [];
  allBtnResponses: any = [];

  botreqResObj: any;
  userReqResObj: any;
  allResponses:any=[];

  showLoading: boolean = true;
  inputEnabled:boolean;

  constructor(private dataService: DataService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.botResponses.next(null);
    this.chatService.userResponses.next(null);
    this.chatService.startSocketConnection();
    this.chatService.getBotRes("botRes1");
  
    this.chatService.listenToSocket();

    this.chatService.userResponsesObserver.subscribe(data => {
      this.userReqResObj = data;
      this.userReqResObj  ? this.chatService.updateShowLoading(false):this.chatService.updateShowLoading(true);
      this.userReqResObj ? this.allResponses.push(this.userReqResObj): null;
    }
    )
    this.chatService.botResponsesObserver.subscribe(data => {
      //Since all bot responses category is text
      this.botreqResObj=data;
      
      this.botreqResObj  ? this.chatService.updateShowLoading(false):this.chatService.updateShowLoading(true);
      this.botreqResObj ? this.allResponses.push(this.botreqResObj): null;
    })

    this.chatService.showLoadingObserver.subscribe(data => {
      this.showLoading = data;
    })
    this.chatService.enableInputObserver.subscribe(data=>
      this.inputEnabled=data)


  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  disableChat() {
    this.disableChatWindow.emit(true);
    this.chatService.closeSocket();
  }

  checkCategory(val) {
    val.category == "txt" ? this.allResponses.push(val) : null;
    val.category == "btn" ? this.allBtnResponses.push(val) : null;
  }


}
