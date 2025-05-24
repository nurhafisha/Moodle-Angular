import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UETableComponent } from './ue-table.component';

describe('UeTableComponent', () => {
  let component: UETableComponent;
  let fixture: ComponentFixture<UETableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UETableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UETableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
