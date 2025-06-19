import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPostFormComponent } from './custom-post-form.component';

describe('CustomPostFormComponent', () => {
  let component: CustomPostFormComponent;
  let fixture: ComponentFixture<CustomPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPostFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
