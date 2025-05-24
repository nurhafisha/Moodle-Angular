import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixUeComponent } from './choix-ue.component';

describe('ChoixUeComponent', () => {
  let component: ChoixUeComponent;
  let fixture: ComponentFixture<ChoixUeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixUeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixUeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
