import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ExecuteService } from '../../services/execute.service';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  
  totItems: any;
  currPageItems: any;
  totItemsPerPage: number = 30;
  nameOfProduct: string;
  descOfProduct: string;
  priceOfProduct: number;
  productDetails: any;
  itemsInCart = [];
  p: number = 1;
  itemsData: any;
  showLoader: boolean = true;
  selectedOption: string;
  msgbefAddingToCart = ["Added Successfully", "Already Added"];
  loaderProducts= new Array<number>(10);
  
  @ViewChildren('productList') listOfProducts: QueryList<any>;

  constructor(private executeService: ExecuteService, private dataService: DataService) { }

  ngOnInit(): void {

    this.executeService.selectedOptionObserver.subscribe(val => this.selectedOption = val );
    this.executeService.loaderForProductsObserver.subscribe(val=>this.showLoader=val);
    //this.executeService.updateProductItems(this.p, this.totItemsPerPage, this.selectedOption)
    this.executeService.productsListObserver.subscribe(data => {
      console.log(data);
      this.itemsData = data;
       this.currPageItems = this.itemsData.records ;
       this.totItems = this.itemsData.totItems ;
       this.p = this.itemsData.currPage ;
    })

    this.executeService.itemsInCartObserver.subscribe((data) => {
      this.itemsInCart = data;
    })

  }

  ngAfterViewInit() {
    this.itemAddedORNot();
  }
  itemAddedORNot() {
    this.listOfProducts.toArray().map((x, index) => this.checkWhetherItemPresentInCart(x.nativeElement.children[1].innerText, index));
  }
  checkWhetherItemPresentInCart(item, index) {
    this.itemsInCart.map(x => item == x.name
      ? this.listOfProducts.toArray()[index].nativeElement.children[4].children[1].innerHTML =
      "<i class='fa fa-check' style='font-size:18px'></i>ADDED"
      : null)

  }
  addItemToCart($event, index) {
    this.productDetails = $event.target.parentElement.parentElement
    this.nameOfProduct = this.productDetails.children[1].innerText;
    this.descOfProduct = this.productDetails.children[2].innerText;
    this.priceOfProduct = parseInt($event.target.parentElement.parentElement.children[4].children[0].innerText.slice(1));
    this.executeService.updatingItemsInCart(
      {
        name: this.nameOfProduct,
        description: this.descOfProduct,
        price: this.priceOfProduct
      }
    );

    this.itemAddedORNot();
  }
  pageChange($event) {
    this.p = $event;
    this.executeService.currPageOfProducts.next(this.p);
    this.executeService.updateProductItems();
    this.itemAddedORNot();
  }


}
