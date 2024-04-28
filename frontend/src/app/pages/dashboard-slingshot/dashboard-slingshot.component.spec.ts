import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSlingshotComponent } from './dashboard-slingshot.component';

describe('DashboardSlingshotComponent', () => {
  let component: DashboardSlingshotComponent;
  let fixture: ComponentFixture<DashboardSlingshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSlingshotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSlingshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
