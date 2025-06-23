import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionTableComponent } from './connection-table.component';

describe('ConnectionTableComponent', () => {
  let component: ConnectionTableComponent;
  let fixture: ComponentFixture<ConnectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
