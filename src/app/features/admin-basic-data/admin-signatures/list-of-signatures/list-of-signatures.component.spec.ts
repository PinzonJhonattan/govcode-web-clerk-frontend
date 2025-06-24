import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSignaturesComponent } from './list-of-signatures.component';

describe('ListOfSignaturesComponent', () => {
  let component: ListOfSignaturesComponent;
  let fixture: ComponentFixture<ListOfSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfSignaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
