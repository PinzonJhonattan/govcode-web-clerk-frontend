import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubgroupComponent } from './delete-subgroup.component';

describe('DeleteRoleComponent', () => {
  let component: DeleteSubgroupComponent;
  let fixture: ComponentFixture<DeleteSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSubgroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
