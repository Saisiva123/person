import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-selection-model',
  templateUrl: './selection-model.component.html',
  styleUrls: ['./selection-model.component.css']
})
export class SelectionModelComponent implements OnInit {

  @Input() modelMessages:any;
  setOfSymptosList=[];
  filteredList=[];
  inputVal:string;
  selectedValues=[];
  submittedTxt:string;
  showSubmittedTxt:boolean=false;
  @ViewChildren('checkBox') checkBox:QueryList<any>

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    console.log(this.modelMessages)
    this.modelMessages? this.modelMessages.msg.map((item,index)=>this.setOfSymptosList[index]=item.list):null;
    this.setOfSymptosList.map((item,index)=>
    {
      this.filteredList[index]=item;
    })
  }
  applyFilters()
  {
    
    this.setOfSymptosList.map((item,index)=>
      {
       this.filteredList[index]=item.filter(val=>val.toLowerCase().startsWith(this.inputVal.toLowerCase()));
      })
     
  }
  selectedOption(e)
  {
    var symptom=this.checkBox.toArray()[e]._elementRef.nativeElement.innerText;
    console.log(symptom);
    this.selectedValues.push(symptom);
  }
  submit()
  {
    this.showSubmittedTxt=true;
    this.submittedTxt=this.selectedValues.join(", ");
    console.log(this.submittedTxt);
    this.chatService.getBotRes(this.modelMessages.nextIdReq);
    
  }

}
