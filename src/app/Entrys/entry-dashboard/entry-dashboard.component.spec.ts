import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDashboardComponent } from './entry-dashboard.component';

describe('EntryDashboardComponent', () => {
  let component: EntryDashboardComponent;
  let fixture: ComponentFixture<EntryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
