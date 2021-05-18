import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MedicinesComponent } from "./home-page/body/medicines/medicines.component";
import { AskDoctorComponent } from "./home-page/body/ask-doctor/ask-doctor.component";
import { LabTestsComponent } from "./home-page/body/lab-tests/lab-tests.component";
import { AyurvedaComponent } from "./home-page/body/ayurveda/ayurveda.component";
import { CartComponent } from "./shared/components/cart/cart.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "/medicines", pathMatch: "full" },
  {
    path:"login",
    component:LoginComponent,
    outlet:'Authentication'
  },
  {
    path:"signup",
    component:LoginComponent,
    outlet:'Authentication'
  },
  {
    path: "medicines",
    component: MedicinesComponent,
  },
  {
    path: "askdoctor",
    component: AskDoctorComponent,
  },
  {
    path: "labtests",
    component: LabTestsComponent,
  },
  {
    path: "ayurveda",
    component: AyurvedaComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  { path: ":typeOfbodySection", component: MedicinesComponent },
  { path: "**", redirectTo: "/medicines", pathMatch: "full" },
  // { path:'**',component:pageNotFoundComoponnent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  MedicinesComponent,
  AskDoctorComponent,
  LabTestsComponent,
  AyurvedaComponent,
  CartComponent
];
