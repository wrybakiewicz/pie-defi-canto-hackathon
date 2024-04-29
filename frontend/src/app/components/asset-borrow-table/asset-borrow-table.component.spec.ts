import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBorrowTableComponent } from './asset-borrow-table.component';

describe('AssetBorrowTableComponent', () => {
  let component: AssetBorrowTableComponent;
  let fixture: ComponentFixture<AssetBorrowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetBorrowTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetBorrowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
