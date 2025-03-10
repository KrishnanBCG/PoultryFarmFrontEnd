import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadEntryReportComponent } from './dead-entry-report.component';

describe('DeadEntryReportComponent', () => {
  let component: DeadEntryReportComponent;
  let fixture: ComponentFixture<DeadEntryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadEntryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeadEntryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
