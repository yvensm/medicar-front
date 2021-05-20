import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentReadComponent } from './appointment-read.component';

describe('AppointmentReadComponent', () => {
  let component: AppointmentReadComponent;
  let fixture: ComponentFixture<AppointmentReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
