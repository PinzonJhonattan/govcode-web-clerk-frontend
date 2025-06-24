import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateRolesComponent } from './associate-roles.component';

describe('AssociateRolesComponent', () => {
  let component: AssociateRolesComponent;
  let fixture: ComponentFixture<AssociateRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
