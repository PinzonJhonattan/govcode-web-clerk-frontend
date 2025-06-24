import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubgroupsComponent } from './list-subgroups.component';

describe('ListSubgroupsComponent', () => {
  let component: ListSubgroupsComponent;
  let fixture: ComponentFixture<ListSubgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubgroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
