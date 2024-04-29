import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCantoLendingComponent } from './dashboard-canto-lending.component';

describe('DashboardCantoLendingComponent', () => {
  let component: DashboardCantoLendingComponent;
  let fixture: ComponentFixture<DashboardCantoLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCantoLendingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCantoLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
