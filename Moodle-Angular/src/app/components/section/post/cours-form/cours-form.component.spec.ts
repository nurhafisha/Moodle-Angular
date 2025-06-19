import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursFormComponent } from './cours-form.component';

describe('CoursFormComponent', () => {
  let component: CoursFormComponent;
  let fixture: ComponentFixture<CoursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
