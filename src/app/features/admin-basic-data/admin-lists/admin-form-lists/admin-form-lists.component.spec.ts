import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormListsComponent } from './admin-form-lists.component';

describe('AdminFormListsComponent', () => {
  let component: AdminFormListsComponent;
  let fixture: ComponentFixture<AdminFormListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
