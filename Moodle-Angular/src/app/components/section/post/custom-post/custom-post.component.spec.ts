import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPostComponent } from './custom-post.component';

describe('CustomPostComponent', () => {
  let component: CustomPostComponent;
  let fixture: ComponentFixture<CustomPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
