import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ExecuteService } from '../../services/execute.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {

  listOfItemsInCart: any;
  noOfItems = [];
  itemName: string;
  totPriceOfAllItems: number = 0;
  @ViewChildren('item') items: QueryList<any>;

  constructor(private executeService: ExecuteService,private cdRef:ChangeDetectorRef) {
  
  }

  ngOnInit(): void {
    this.executeService.itemsInCartObserver.subscribe(data => this.listOfItemsInCart = data);
    this.noOfItems.length = this.listOfItemsInCart.length;
    for (var i = 0; i < this.noOfItems.length; i++) {
      this.noOfItems[i] = 1;
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      
      this.updatePrice();
    })
   
  }
 
  updatePrice() {
    this.totPriceOfAllItems = 0;
   this.items.map(item => {
      this.cdRef.detectChanges();
      console.log(item.nativeElement.children[0].children[1],item.nativeElement.children[0].children[1].innerText);
      this.totPriceOfAllItems += parseInt(item.nativeElement.children[0].children[1].innerText)?
      parseInt(item.nativeElement.children[0].children[1].innerText):
      0;
    })
  }

  decreaseItem(index, name) {
    this.noOfItems[index] == 1 ? this.deleteItemFromCart(name, index) :
      this.decreaseItemByOne(index);
  }
  decreaseItemByOne(index)
  {
    this.noOfItems[index] -= 1; 
    this.updatePrice() ;
  }
  increaseItem(index) {
    this.noOfItems[index] += 1;
    this.updatePrice();
  }
  deleteItemFromCart(name, index) {
    this.noOfItems.splice(index, 1);
    this.itemName = name;
    this.executeService.deleteFromcart(this.itemName);
    this.cdRef.detectChanges();
    this.updatePrice();
  }

}
