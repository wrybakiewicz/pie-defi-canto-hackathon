import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadenceLeaderboardComponent } from './cadence-leaderboard.component';

describe('CadenceLeaderboardComponent', () => {
  let component: CadenceLeaderboardComponent;
  let fixture: ComponentFixture<CadenceLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadenceLeaderboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadenceLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
