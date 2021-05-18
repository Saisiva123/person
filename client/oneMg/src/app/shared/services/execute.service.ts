import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: "root",
})

export class ExecuteService {

  deletedItem: string;
  item: any;
  leftNavigationData = {};
  showBottToTopScroll:boolean=true;

  constructor(private dataService: DataService) {
  }

  public initialSelectedCategory: string = "All Medicines";
  public filterList = [];
  public dataForLeftNavigation = new BehaviorSubject({});
  public selectedOption = new BehaviorSubject("null");
  public selectedCategory = new BehaviorSubject(this.initialSelectedCategory);
  public initialItemsInCart = [];
  public itemsInCart = new BehaviorSubject(this.initialItemsInCart);
  public isLoginEnabled = new BehaviorSubject({ displayAuth: false, authValue: null });
  public showLoaderForLeftNav = new BehaviorSubject(true);
  public showLoaderForProducts = new BehaviorSubject(true);
  public listOfFilters = new BehaviorSubject(this.filterList);
  public productsList = new BehaviorSubject({});
  public sortFilters = new BehaviorSubject({
    value:null,
    type:null
  });
  public currPageOfProducts = new BehaviorSubject<number>(1);
  public bottToTopScrollBtn = new BehaviorSubject(this.showBottToTopScroll);

  leftNavDataObsertver = this.dataForLeftNavigation.asObservable();
  selectedOptionObserver = this.selectedOption.asObservable();
  selectedCategoryObserver = this.selectedCategory.asObservable();
  itemsInCartObserver = this.itemsInCart.asObservable();
  isLoginEnabledObserver = this.isLoginEnabled.asObservable();
  leftNavLoaderObserver = this.showLoaderForLeftNav.asObservable();
  loaderForProductsObserver = this.showLoaderForProducts.asObservable();
  listOfFiltersObserver = this.listOfFilters.asObservable();
  productsListObserver = this.productsList.asObservable();
  sortFiltersObserver = this.sortFilters.asObservable();
  currPageOfProductsObserver = this.currPageOfProducts.asObservable();
  bottToTopScrollBtnObserver=  this.bottToTopScrollBtn.asObservable();

  updateLeftNavigationData(activeOption) {
    this.listOfFilters.next([]);
    this.showLoaderForLeftNav.next(true);
    this.dataService.getLeftNavigationData(activeOption).subscribe((res) => {
      console.log(res);
      Object.keys(res).length ? this.showLoaderForLeftNav.next(false) : this.showLoaderForLeftNav.next(true);
      this.dataForLeftNavigation.next(res[activeOption]);
      console.log(this.dataForLeftNavigation.getValue());
    })
  }

  updateSelectedOption(activeOption) {
    this.updateLeftNavigationData(activeOption);
    this.selectedOption.next(activeOption);
    this.updateProductItems();
  }

  updatingItemsInCart(item) {
    !this.checkItemExistsInCart(item.name) ? this.itemsInCart.next(this.itemsInCart.getValue().concat([item])) : alert("Item already Exists");
  }

  deleteFromcart(item) {
    this.deletedItem = item;
    var arrOfItems: any[] = this.itemsInCart.getValue();
    arrOfItems.map((item, index) => {
      item.name == this.deletedItem ? arrOfItems.splice(index, 1) : null;
    })
    this.itemsInCart.next(arrOfItems);
  }

  checkItemExistsInCart(item): boolean {
    this.item = item;
    var totItems: any[] = this.itemsInCart.getValue();
    var itemExists = totItems.some(x => x.name == item);
    if (itemExists) { return true }
    else { return false };
  }

  updateFilterOptionsList(value) {
    this.listOfFilters.getValue().some(x => x == value) ?
      this.listOfFilters.next(this.listOfFilters.getValue().filter((x) => !x.includes(value))) :
      this.listOfFilters.getValue().push(value);
  }

  updateProductItems() {
    let activeOption = this.selectedOption.getValue();
    let sortValue = this.sortFilters.getValue().value ;
    let sortType = this.sortFilters.getValue().type ;
    let currPage = this.currPageOfProducts.getValue();
    let itemsPerPage = 30;

    console.log(activeOption, sortValue, sortType, currPage, itemsPerPage)

    //should be called through config service

    this.showLoaderForProducts.next(true);
    this.dataService.getItemsPerPage(activeOption, sortValue, sortType, currPage, itemsPerPage).subscribe((val) => {
      Object.keys(val).length ? this.showLoaderForProducts.next(false) : this.showLoaderForProducts.next(true)
      console.log(val);
      this.productsList.next(val);
    });

  }
  updateSortFilters(value) {
    this.sortFilters.next(value);
    this.updateProductItems();
  }

  toggleBottToTopScroll(val)
  {
    this.bottToTopScrollBtn.next(val);
  }

} 