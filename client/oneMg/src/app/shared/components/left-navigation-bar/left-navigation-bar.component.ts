import { Component, OnInit } from "@angular/core";
import { ExecuteService } from "../../services/execute.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "left-navigation-bar",
  templateUrl: "./left-navigation-bar.component.html",
  styleUrls: ["./left-navigation-bar.component.css"],
})
export class LeftNavigationBarComponent implements OnInit {
  navData: {};
  keys: any;
  values: any;
  activeOption: string;
  allFilters = [];
  leftNavSubscription:Subscription;
  showLoader :boolean=true;
  
  constructor(
    private executeService: ExecuteService
  ) {}

  ngOnInit(): void {
 this.executeService.leftNavLoaderObserver.subscribe(val=>
    {
      this.showLoader=val;
    }) 

    this.executeService.leftNavDataObsertver.subscribe(data => {
      this.navData = data;
        this.keys = Object.keys(this.navData);
        this.values = Object.values(this.navData);
        this.keys=this.keys.splice(0,this.keys.length-1);
        this.values=this.values.splice(0,this.values.length-1);
        console.log(this.keys,this.values);
    });

    this.executeService.selectedOptionObserver.subscribe(
      (selectedOptionInNavigation) =>
        (this.activeOption = selectedOptionInNavigation)
    );
    
    this.executeService.listOfFiltersObserver.subscribe(data=>{
      this.allFilters=data;
    });
    
  }
 

  selectedOptionInCategory($event) {
    this.activeOption = $event.target.textContent;
    this.executeService.updateSelectedOption(this.activeOption);
  }
  selectedOptionInFilters(value) {
    this.executeService.updateFilterOptionsList(value);
  }


}
