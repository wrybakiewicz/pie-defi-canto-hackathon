import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCadenceComponent } from './dashboard-cadence.component';

describe('DashboardCadenceComponent', () => {
  let component: DashboardCadenceComponent;
  let fixture: ComponentFixture<DashboardCadenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCadenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCadenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
