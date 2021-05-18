import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationComponent } from './home-page/navigation/navigation.component';
import { NavigationBarComponent } from './home-page/navigation/navigation-bar/navigation-bar.component';
import { MedicineSearchComponent } from './home-page/navigation/medicine-search/medicine-search.component';
import { NavigationCategoriesComponent } from './home-page/navigation/navigation-categories/navigation-categories.component';
import { BodyComponent } from './home-page/body/body.component';
import { LeftNavigationBarComponent } from './shared/components/left-navigation-bar/left-navigation-bar.component';
import { DataService } from './shared/services/data.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './shared/components/products-list/products-list.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FooterComponent } from './shared/components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChatWindowComponent } from './home-page/body/ask-doctor/chat-window/chat-window.component';
import { InputComponent } from './home-page/body/ask-doctor/chat-window/input/input.component';
import { ButtonsComponent } from './home-page/body/ask-doctor/chat-window/buttons/buttons.component';
import { TextComponent } from './home-page/body/ask-doctor/chat-window/text/text.component';
import { SelectionModelComponent } from './home-page/body/ask-doctor/chat-window/selection-model/selection-model.component';
import { SelectionListComponent } from './home-page/body/ask-doctor/chat-window/selection-list/selection-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationComponent,
    NavigationBarComponent,
    MedicineSearchComponent,
    NavigationCategoriesComponent,
    BodyComponent,
    routingComponents,
    LeftNavigationBarComponent,
    ProductsListComponent,
    FooterComponent,
    ChatWindowComponent,
    InputComponent,
    ButtonsComponent,
    TextComponent,
    SelectionModelComponent,
    SelectionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxSkeletonLoaderModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
