import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManyMembersComponent } from './delete-many-members.component';

describe('DeleteManyMembersComponent', () => {
  let component: DeleteManyMembersComponent;
  let fixture: ComponentFixture<DeleteManyMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManyMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteManyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
