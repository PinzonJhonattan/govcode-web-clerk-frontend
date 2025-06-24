import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCitizensTabsComponent } from './manage-citizens-tabs.component';

describe('ManageCitizensTabsComponent', () => {
  let component: ManageCitizensTabsComponent;
  let fixture: ComponentFixture<ManageCitizensTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCitizensTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCitizensTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
