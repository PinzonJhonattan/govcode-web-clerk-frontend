import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCitizensComponent } from './list-of-citizens.component';

describe('ListOfCitizensComponent', () => {
  let component: ListOfCitizensComponent;
  let fixture: ComponentFixture<ListOfCitizensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCitizensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfCitizensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
