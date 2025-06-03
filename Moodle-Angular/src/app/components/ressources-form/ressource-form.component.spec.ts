import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceFormComponent } from './ressource-form.component';

describe('RessourceFormComponent', () => {
  let component: RessourceFormComponent;
  let fixture: ComponentFixture<RessourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
