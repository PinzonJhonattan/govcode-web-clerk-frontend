import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListNameFormComponent } from './edit-list-name-form.component';

describe('EditListNameFormComponent', () => {
  let component: EditListNameFormComponent;
  let fixture: ComponentFixture<EditListNameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListNameFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
