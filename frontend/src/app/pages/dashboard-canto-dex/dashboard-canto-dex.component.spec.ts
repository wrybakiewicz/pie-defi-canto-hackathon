import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCantoDexComponent } from './dashboard-canto-dex.component';

describe('DashboardCantoDexComponent', () => {
  let component: DashboardCantoDexComponent;
  let fixture: ComponentFixture<DashboardCantoDexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCantoDexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCantoDexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
