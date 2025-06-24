import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAuthorizedUsersComponent } from './list-of-authorized-users.component';

describe('ListOfAuthorizedUsersComponent', () => {
  let component: ListOfAuthorizedUsersComponent;
  let fixture: ComponentFixture<ListOfAuthorizedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAuthorizedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfAuthorizedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
