import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthorizedUsersComponent } from './create-authorized-users.component';

describe('CreateAuthorizedUsersComponent', () => {
  let component: CreateAuthorizedUsersComponent;
  let fixture: ComponentFixture<CreateAuthorizedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAuthorizedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuthorizedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
