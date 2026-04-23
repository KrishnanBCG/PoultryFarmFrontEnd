import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadEntryComponent } from './dead-entry.component';

describe('DeadEntryComponent', () => {
  let component: DeadEntryComponent;
  let fixture: ComponentFixture<DeadEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeadEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
