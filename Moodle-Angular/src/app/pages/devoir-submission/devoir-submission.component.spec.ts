import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoirSubmissionComponent } from './devoir-submission.component';

describe('DevoirSubmissionComponent', () => {
  let component: DevoirSubmissionComponent;
  let fixture: ComponentFixture<DevoirSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevoirSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevoirSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
