import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineSearchComponent } from './medicine-search.component';

describe('MedicineSearchComponent', () => {
  let component: MedicineSearchComponent;
  let fixture: ComponentFixture<MedicineSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
