import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveManySubgroupsGroupComponent } from './remove-many-subgroups-group.component';

describe('RemoveManyGroupsGroupComponent', () => {
  let component: RemoveManySubgroupsGroupComponent;
  let fixture: ComponentFixture<RemoveManySubgroupsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RemoveManySubgroupsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveManySubgroupsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
