import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPowerBiComponent } from './report-power-bi.component';

describe('ReportPowerBiComponent', () => {
  let component: ReportPowerBiComponent;
  let fixture: ComponentFixture<ReportPowerBiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPowerBiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPowerBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
