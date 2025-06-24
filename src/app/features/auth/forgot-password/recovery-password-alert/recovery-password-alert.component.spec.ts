import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPasswordAlertComponent } from './recovery-password-alert.component';

describe('RecoveryPasswordAlertComponent', () => {
  let component: RecoveryPasswordAlertComponent;
  let fixture: ComponentFixture<RecoveryPasswordAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryPasswordAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryPasswordAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
