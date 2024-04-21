import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCantoComponent } from './dashboard-canto.component';

describe('DashboardCantoComponent', () => {
  let component: DashboardCantoComponent;
  let fixture: ComponentFixture<DashboardCantoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCantoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
