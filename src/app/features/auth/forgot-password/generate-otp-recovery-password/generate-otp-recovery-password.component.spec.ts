import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOtpRecoveryPasswordComponent } from './generate-otp-recovery-password.component';

describe('GenerateOtpRecoveryPasswordComponent', () => {
  let component: GenerateOtpRecoveryPasswordComponent;
  let fixture: ComponentFixture<GenerateOtpRecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateOtpRecoveryPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateOtpRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
