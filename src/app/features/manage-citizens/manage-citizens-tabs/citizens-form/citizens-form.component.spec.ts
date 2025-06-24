import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizensFormComponent } from './citizens-form.component';

describe('CitizensFormComponent', () => {
  let component: CitizensFormComponent;
  let fixture: ComponentFixture<CitizensFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitizensFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
