import { Component, OnInit } from "@angular/core";
import { Router,NavigationStart  } from "@angular/router";
import { ExecuteService } from '../../shared/services/execute.service';

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {

  showNavBar:boolean=true;
  showMedicineSearch:boolean=true;
  showCategory:boolean=true;
  currentLoc:string;

  constructor(private router:Router , private executeService:ExecuteService) {}

  ngOnInit(): void {

      this.router.events.subscribe(event =>{
        if (event instanceof NavigationStart){

          this.currentLoc=event.url;
          this.currentLoc=='/labtests' ||
          this.currentLoc=='/ayurveda' ||
          this.currentLoc=='/cart'       ? this.showCategory=false:this.showCategory=true;
          
          this.currentLoc=='/cart' ? this.showNavBar=false :this.showNavBar=true ;
          this.currentLoc=='/askdoctor' ? this.toggleNavbar(false):this.enableScrollBottToTopBtn();
         
        }
     })
   
  }
  toggleNavbar(val)
  {
    this.showCategory=val;
    this.showMedicineSearch=val;
    this.executeService.toggleBottToTopScroll(false);
  }
  enableScrollBottToTopBtn()
  {
    this.showMedicineSearch=true;
    this.executeService.toggleBottToTopScroll(true);
  }
  
 
  
}
