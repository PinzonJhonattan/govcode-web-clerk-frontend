import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOtpChangePasswordComponent } from './validate-otp-change-password.component';

describe('ValidateOtpChangePasswordComponent', () => {
  let component: ValidateOtpChangePasswordComponent;
  let fixture: ComponentFixture<ValidateOtpChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateOtpChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateOtpChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
