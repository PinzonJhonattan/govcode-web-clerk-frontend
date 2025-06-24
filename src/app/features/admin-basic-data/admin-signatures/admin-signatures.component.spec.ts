import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignaturesComponent } from './admin-signatures.component';

describe('AdminSignaturesComponent', () => {
  let component: AdminSignaturesComponent;
  let fixture: ComponentFixture<AdminSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSignaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
