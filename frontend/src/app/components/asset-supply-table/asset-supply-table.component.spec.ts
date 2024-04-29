import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSupplyTableComponent } from './asset-supply-table.component';

describe('AssetSupplyTableComponent', () => {
  let component: AssetSupplyTableComponent;
  let fixture: ComponentFixture<AssetSupplyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetSupplyTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetSupplyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
