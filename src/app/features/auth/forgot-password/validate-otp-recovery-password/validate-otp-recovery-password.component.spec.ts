import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOtpRecoveryPasswordComponent } from './validate-otp-recovery-password.component';

describe('ValidateOtpRecoveryPasswordComponent', () => {
  let component: ValidateOtpRecoveryPasswordComponent;
  let fixture: ComponentFixture<ValidateOtpRecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateOtpRecoveryPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateOtpRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
