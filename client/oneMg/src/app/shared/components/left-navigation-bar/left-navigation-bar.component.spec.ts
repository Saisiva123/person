import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavigationBarComponent } from './left-navigation-bar.component';

describe('LeftNavigationBarComponent', () => {
  let component: LeftNavigationBarComponent;
  let fixture: ComponentFixture<LeftNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
