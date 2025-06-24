import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAdminListsComponent } from './list-of-admin-lists.component';

describe('ListOfAdminListsComponent', () => {
  let component: ListOfAdminListsComponent;
  let fixture: ComponentFixture<ListOfAdminListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAdminListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfAdminListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
