import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  recognition = new webkitSpeechRecognition();
  showAnimatedSpeechIcon:boolean=false;
  showInput:boolean;
  inputValue:any;
  idOfBotReq:number;

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.chatService.enableInputObserver.subscribe(data=>
      {
        this.showInput=data;
      })
  }
  audio()
  {
    this.toggleSpeechIcon();
    this.recognition.start();
    this.recognition.onresult = function(event) {
      console.log(event.results[0][0].transcript);
      this.inputValue=event.results[0][0].transcript;
    }
    this.inputValue?this.sendValOfInput():null;
  }
  toggleSpeechIcon()
  {
    this.showAnimatedSpeechIcon=!this.showAnimatedSpeechIcon;
  }
  submitAfterClickingEnter(e)
  {
    e.keyCode==13?this.sendValOfInput():null;
  }
  sendValOfInput()
  {
  this.chatService.userResponses.next(
    { 
        source:"user",
        category:"txt",
        msg:[this.inputValue],
        nextIdReq: "",
        nextCategory:"botResToInput"
      }
  );
  this.chatService.botResponsesObserver.subscribe(data=>
    {
      let id=data.nextIdReq;
      console.log(id.substr(id.length - 1));
      this.idOfBotReq=parseInt(id.substr(id.length - 1))
    });
  this.chatService.getBotRes("botRes"+(this.idOfBotReq+1));
  this.inputValue=null;
  this.chatService.toggleInput(false);
  }
}
