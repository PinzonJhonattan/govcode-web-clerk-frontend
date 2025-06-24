import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTemplatesComponent } from './list-of-templates.component';

describe('ListOfTemplatesComponent', () => {
  let component: ListOfTemplatesComponent;
  let fixture: ComponentFixture<ListOfTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
