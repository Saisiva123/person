import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCategoriesComponent } from './navigation-categories.component';

describe('NavigationCategoriesComponent', () => {
  let component: NavigationCategoriesComponent;
  let fixture: ComponentFixture<NavigationCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
