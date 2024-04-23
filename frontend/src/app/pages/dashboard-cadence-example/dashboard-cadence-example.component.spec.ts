import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCadenceExampleComponent } from './dashboard-cadence-example.component';

describe('DashboardCadenceComponent', () => {
  let component: DashboardCadenceExampleComponent;
  let fixture: ComponentFixture<DashboardCadenceExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCadenceExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCadenceExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
