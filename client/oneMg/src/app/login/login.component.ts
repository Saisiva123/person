import { Component, OnInit } from '@angular/core';
import { ExecuteService } from  '../shared/services/execute.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NonNullAssert } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLogin:boolean;
  hide:boolean=true;
  authCategory:string;
  
  slides=[
    {
      img:'../assets/healthcare.png',
      content:{
        title:'Make Healthcare Simpler',
        text:'Get medicine information, order medicines, book lab tests and consult doctors online from the comfort of your home.'
      }
    },
    {
      img:'../assets/Know-Your-Medicines.png',
      content:{
        title:'Know Your Medicines',
        text:'View medicine information like usage, side effects and cheaper substitutes before you take them.'
      }
    },
    {
      img:'../assets/Home-Delivery-of-Medicines.png',
      content:{
        title:'Medicines, Home Delivered',
        text:'Order any medicine or health product and we’ll deliver it for free. Enjoy discounts on everything.'
      }
    },
    {
      img:'../assets/Lab-Tests-at-Home.png',
      content:{
        title:'Lab Tests at Home',
        text:"Book any test from any lab. We'll collect the sample and send the reports. Save up to 80% every time."
      }
    },
    {
      img:'../assets/Health-Related-Queries.png',
      content:{
        title:'Health Related Queries?',
        text:'Consult our certified doctors from anywhere, anytime, and for free. We guarantee your privacy.'
      }
    }

  ]

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": true,
    "autoplay":true,
    "autoplaySpeed":2000,
    "pauseOnFocus": false,
    "pauseOnHover": true,
    "pauseOnDotsHover": false,
    "speed":1000,
    "fade": true,
        "cssEase": 'linear'

  };
  constructor(private executeService:ExecuteService) { }

  ngOnInit(): void {
    this.executeService.isLoginEnabledObserver.subscribe((data)=>
     {
       this.authCategory=data.authValue; 
      this.showLogin=data.displayAuth}
      );
  }
  disableLogin()
  {
    this.executeService.isLoginEnabled.next(
      {
        displayAuth:false,
        authValue:null
      }
    );
  }
  changeAuthCategory(authCat)
  {
    this.authCategory=authCat;
  }




}
