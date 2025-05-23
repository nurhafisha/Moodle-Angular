import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuUeComponent } from './contenu-ue.component';

describe('ContenuUeComponent', () => {
  let component: ContenuUeComponent;
  let fixture: ComponentFixture<ContenuUeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenuUeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenuUeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
