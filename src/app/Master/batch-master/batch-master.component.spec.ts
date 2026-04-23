import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMasterComponent } from './batch-master.component';

describe('BatchMasterComponent', () => {
  let component: BatchMasterComponent;
  let fixture: ComponentFixture<BatchMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
