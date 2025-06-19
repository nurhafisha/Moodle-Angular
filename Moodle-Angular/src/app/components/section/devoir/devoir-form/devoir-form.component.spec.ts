import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoirFormComponent } from './devoir-form.component';

describe('DevoirFormComponent', () => {
  let component: DevoirFormComponent;
  let fixture: ComponentFixture<DevoirFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevoirFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevoirFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
