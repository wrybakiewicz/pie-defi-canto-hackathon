import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapsTableComponent } from './swaps-table.component';

describe('SwapsTableComponent', () => {
  let component: SwapsTableComponent;
  let fixture: ComponentFixture<SwapsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwapsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
