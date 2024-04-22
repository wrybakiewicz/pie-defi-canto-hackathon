import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTradesComponent } from './total-trades.component';

describe('TotalTradesComponent', () => {
  let component: TotalTradesComponent;
  let fixture: ComponentFixture<TotalTradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalTradesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
