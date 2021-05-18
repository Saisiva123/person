import {  Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExecuteService } from '../../../shared/services/execute.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  noOfItemsInCart: number;
  firstCartItem: [];
  secondCartItem: string;

  constructor(private executeService: ExecuteService, private router: Router) { }

  ngOnInit(): void {
    this.executeService.itemsInCartObserver.subscribe(data => {
      this.noOfItemsInCart = data.length;
      this.noOfItemsInCart > 0 ?
        this.firstTwoItemsInCart(data) :
        null;
    });

    setTimeout(() =>
      this.executeService.isLoginEnabledObserver.subscribe(data => {
        !data.displayAuth ? this.router.navigate([{ outlets: { Authentication: null } }]) : null;
      })
    );
  }

  firstTwoItemsInCart(data) {
    this.firstCartItem = data[0].name;
    this.secondCartItem = data[1] ? data[1].name : null;
  }
  enableLogin(auth) {
    this.executeService.isLoginEnabled.next(
      {
        displayAuth:true,
        authValue:auth
      }
    );
  }


}
