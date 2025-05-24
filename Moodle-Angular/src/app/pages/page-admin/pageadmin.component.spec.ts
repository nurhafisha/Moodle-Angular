import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageadminComponent } from './pageadmin.component';

describe('PageadminComponent', () => {
  let component: PageadminComponent;
  let fixture: ComponentFixture<PageadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
