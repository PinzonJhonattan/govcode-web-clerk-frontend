import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddressGeneratorComponent } from './modal-address-generator.component';

describe('ModalAddressGeneratorComponent', () => {
  let component: ModalAddressGeneratorComponent;
  let fixture: ComponentFixture<ModalAddressGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddressGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddressGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
