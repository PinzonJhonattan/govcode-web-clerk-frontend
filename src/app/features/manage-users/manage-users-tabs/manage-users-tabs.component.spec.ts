import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersTabsComponent } from './manage-users-tabs.component';

describe('ManageUsersTabsComponent', () => {
  let component: ManageUsersTabsComponent;
  let fixture: ComponentFixture<ManageUsersTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsersTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUsersTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
