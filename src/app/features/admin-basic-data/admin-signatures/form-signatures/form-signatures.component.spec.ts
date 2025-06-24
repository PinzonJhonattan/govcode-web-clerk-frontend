import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignaturesComponent } from './form-signatures.component';

describe('FormSignaturesComponent', () => {
  let component: FormSignaturesComponent;
  let fixture: ComponentFixture<FormSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSignaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
