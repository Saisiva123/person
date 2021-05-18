import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { chatResponse } from "../../interfaces/chatResponse.model";
import { DataService } from './data.service';


@Injectable({
    providedIn: "root",
})

export class ChatService {

    private socket;
    private botreqResObj;

    public userResponses = new BehaviorSubject<chatResponse>(null);
    userResponsesObserver = this.userResponses.asObservable();

    public botResponses = new BehaviorSubject<chatResponse>(null);
    botResponsesObserver = this.botResponses.asObservable();

    public showLoading = new BehaviorSubject(true);
    showLoadingObserver = this.showLoading.asObservable();

    public enableInput = new BehaviorSubject(false);
    enableInputObserver = this.enableInput.asObservable();

    constructor(private dataService:DataService) { }
    
    startSocketConnection()
    {
        this.socket= io("http://localhost:3000");
    }

    emitEventFromBot(val,nextCategory) {
        console.log("emitted");
        val=="finished"?this.closeSocket():null;
        nextCategory=="input" ? this.toggleInput(true):this.socket.emit(val, val);
    }

    listenToSocket() {
        console.log("listening to event");
        this.socket.on('userResponses', data => {
            console.log(data);
            this.userResponses.next(data);
        });
    }

      getBotRes(val) {
        this.updateShowLoading(true);
        setTimeout(()=>{ this.getData(val)},2000);

      }
      getData(val)
      {
        console.log(val);
        this.botreqResObj = this.dataService.getBotResponses(val);
        this.botreqResObj ? this.showLoading.next(false) : this.showLoading.next(true);
        this.botResponses.next(this.botreqResObj);
        this.emitEventFromBot(this.botreqResObj.nextIdReq,this.botreqResObj.nextCategory);
      }
      updateShowLoading(val)
      {
          this.showLoading.next(val);
      }
      toggleInput(val)
      {
          this.enableInput.next(val);
      }
     closeSocket()
     {
         this.socket.emit('close connection',"socket closed");
     }
}