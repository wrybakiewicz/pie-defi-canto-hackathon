import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSearchOverlayComponent } from './pre-search-overlay.component';

describe('PreSearchOverlayComponent', () => {
  let component: PreSearchOverlayComponent;
  let fixture: ComponentFixture<PreSearchOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreSearchOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreSearchOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
