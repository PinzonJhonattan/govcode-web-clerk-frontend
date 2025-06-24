import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveManyRolesGroupComponent } from './leave-many-roles-group.component';

describe('LeaveManyRolesGroupComponent', () => {
  let component: LeaveManyRolesGroupComponent;
  let fixture: ComponentFixture<LeaveManyRolesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveManyRolesGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveManyRolesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
