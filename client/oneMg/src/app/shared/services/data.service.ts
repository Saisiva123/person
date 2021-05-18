import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs/operators";
import * as io from 'socket.io-client';

@Injectable({
  providedIn: "root",
})
export class DataService {

  private navCategoriesUrl = "http://localhost:3000/api/navCategories";
  private leftNavUrl = "http://localhost:3000/api/getProductDetails/" ;
  private itemsPerPageurl = "http://localhost:3000/api/getProducts";

  public botResonses = {
    "botRes1": {
      source: "bot",
      category: "txt",
      msg: ["Hi I'm Sara. Your personal health assistant.", "Before beginning this session, Kindly let me know who this consultation is for?"],
      nextIdReq: "userRes1"
    },
    "botRes2": {
      source: "bot",
      category: "txt",
      msg: ["Alright.Can I know your name please?"],
      nextIdReq: "userRes2",
      nextCategory: "input"
    },
    "botRes3": {
      source: "bot",
      category: "txt",
      msg: ["Okay. Please select the problem that you are facing."],
      nextIdReq: "userRes3"
    },
    
    "botRes4": {
      source: "bot",
      category: "txt",
      msg: ["I think that your problem might lie in one of the following specialities. Please pick one so that we can proceed."],
      nextIdReq: "userRes4"
    },
    "botRes5": {
      source: "bot",
      category: "txt",
      msg: ["Could You please mention the severity of the symptoms"],
      nextIdReq: "userRes5"
    },
    "botRes6": {
      source: "bot",
      category: "txt",
      msg: ["Ok. Please help me with your age."],
      nextIdReq: "userRes6",
      nextCategory: "input"
    },
    "botRes7": {
      source: "bot",
      category: "txt",
      msg: ["Could you please tell me your gender?"],
      nextIdReq: "userRes7",
    },
    "botRes8": {
      source: "bot",
      category: "txt",
      msg: ["We are almost there. I just need a few more details to assess your problem correctly.", "Since how long do you have the symptoms?"],
      nextIdReq: "userRes8",
    },
    "botRes9": {
      source: "bot",
      category: "txt",
      msg: ["Thanks for the details.We will come back to you shortly"],
      nextIdReq: "finished",
    }
  }

  constructor(private http: HttpClient) { }

  getNavigationData() {
    return this.http.get(this.navCategoriesUrl).pipe(delay(1300));
  }

  getLeftNavigationData(selectedOption) {
    return this.http.get(this.leftNavUrl + selectedOption).pipe(delay(1300));
  }

  getItemsPerPage(activeOption, sortValue, sortType, page, limit) {
    console.log(this.itemsPerPageurl + "?product=" + activeOption + "&value=" + sortValue + "&type=" + sortType + "&page=" + page + "&limit=" + limit);
    return this.http.get(this.itemsPerPageurl + "?product=" + activeOption + "&value=" + sortValue + "&type=" + sortType + "&page=" + page + "&limit=" + limit).pipe(delay(1300));
  }

  getBotResponses(val) {
    return this.botResonses[val];
  }




}