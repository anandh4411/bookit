import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatSelectionPage } from './seat-selection.page';

describe('SeatSelectionPage', () => {
  let component: SeatSelectionPage;
  let fixture: ComponentFixture<SeatSelectionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatSelectionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
