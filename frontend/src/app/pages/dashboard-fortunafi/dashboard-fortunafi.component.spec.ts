import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFortunafiComponent } from './dashboard-fortunafi.component';

describe('DashboardFortunafiComponent', () => {
  let component: DashboardFortunafiComponent;
  let fixture: ComponentFixture<DashboardFortunafiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFortunafiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardFortunafiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
