import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOtpChangePasswordComponent } from './generate-otp-change-password.component';

describe('GenerateOtpChangePasswordComponent', () => {
  let component: GenerateOtpChangePasswordComponent;
  let fixture: ComponentFixture<GenerateOtpChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateOtpChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateOtpChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
