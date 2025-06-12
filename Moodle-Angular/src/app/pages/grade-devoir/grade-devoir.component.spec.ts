import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeDevoirComponent } from './grade-devoir.component';

describe('GradeDevoirComponent', () => {
  let component: GradeDevoirComponent;
  let fixture: ComponentFixture<GradeDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeDevoirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
