import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnlChartComponent } from './pnl-chart.component';

describe('PnlChartComponent', () => {
  let component: PnlChartComponent;
  let fixture: ComponentFixture<PnlChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnlChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PnlChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
