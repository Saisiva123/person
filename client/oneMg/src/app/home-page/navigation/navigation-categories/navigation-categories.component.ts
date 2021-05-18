import { Component, OnInit } from "@angular/core";
import { ExecuteService } from "../../../shared/services/execute.service";
import { DataService } from "src/app/shared/services/data.service";
import { FormControl } from '@angular/forms';

@Component({
  selector: "navigation-categories",
  templateUrl: "./navigation-categories.component.html",
  styleUrls: ["./navigation-categories.component.css"],
})
export class NavigationCategoriesComponent implements OnInit {
  showCategorySection: boolean = true;
  selectedCategory: string;
  selectedOption: string;
  totSelectCategories: any;
  setOfOptions: any;
  leftSideNavBarData: any;
  showLoader: boolean = true;
  categoriesControl = new FormControl();

  constructor(
    private executeService: ExecuteService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.dataService.getNavigationData().subscribe((data) => {
      Object.keys(data).length ? this.showLoader = false : this.showLoader = true;
      this.showLoader = false;
      this.totSelectCategories = Object.keys(data);
      this.setOfOptions = Object.values(data);
     
    }
    )
  }
  selectOption($event) {
    this.selectedCategory =
      $event.value;
    this.selectedOption =
      $event.source.selected._element.nativeElement.innerText;
    this.executeService.updateSelectedOption(this.selectedOption);
    this.executeService.updateLeftNavigationData(this.selectedOption);
   
  }
 

}
