import { Component, OnInit } from '@angular/core';
import { ExecuteService } from '../../../shared/services/execute.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  currentCategory: string;
  currentOption: string;
  //TODO:properties for mat-chip need to check
  selectable = true;
  removable = true;
  filterOptionsList: string[];
  productsRecord: any;
  currPage: number;
  itemsPerPage: any;
  totItems: number;
  startIndex: number;
  sortControl = new FormControl();
  sortOptions = [
    {
      value: "All Products",
      type: "none"
    },
    {
      value: "Price: High To Low",
      id:"cost",
      type: "desc"
    },
    {
      value: "Rating: High To Low",
      id:"rating",
      type: "desc"
    },
    {
      value: "Rating: Low To High",
      id:"rating",
      type: "asc"
    },
    {
      value: "Price: Low To High",
      id:"cost",
      type: "asc"
    }];

  constructor(private executeService: ExecuteService) { }

  ngOnInit(): void {
    this.executeService.selectedOptionObserver.subscribe(data => this.currentOption = data);
    this.executeService.selectedCategoryObserver.subscribe(data => this.currentCategory = data);
    this.executeService.listOfFiltersObserver.subscribe(data => this.filterOptionsList = data);
    this.executeService.productsListObserver.subscribe(val => {
      Object.keys(val).length ? this.calcProductDetails(val) : null;
    });
  }

  calcProductDetails(value) {
    this.productsRecord = value;
    this.currPage = this.productsRecord.currPage;
    this.totItems = this.productsRecord.totItems;
    this.itemsPerPage = this.productsRecord.records.length;
    this.startIndex = this.productsRecord.startIndexOfCurrPage;

  }

  remove(value: string): void {
    this.executeService.updateFilterOptionsList(value);

  }
  clearFilters() {
    this.filterOptionsList.map(val => this.executeService.updateFilterOptionsList(val));
  }
  selectSortOption(event) {
    event.value.id=event.value.id=="none"?null:event.value.id;
    let sortOptions = {
      value: event.value.id,
      type: event.value.type
    }
    this.executeService.updateSortFilters(sortOptions)
  }
}
