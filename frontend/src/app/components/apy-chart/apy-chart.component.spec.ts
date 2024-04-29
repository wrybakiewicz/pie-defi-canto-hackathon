import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApyChartComponent } from './apy-chart.component';

describe('ApyChartComponent', () => {
  let component: ApyChartComponent;
  let fixture: ComponentFixture<ApyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApyChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
