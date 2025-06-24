import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveGroupsComponent } from './move-groups.component';

describe('MoveGroupsComponent', () => {
  let component: MoveGroupsComponent;
  let fixture: ComponentFixture<MoveGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
