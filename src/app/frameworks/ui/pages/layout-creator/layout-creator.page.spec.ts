import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCreatorPage } from './layout-creator.page';

describe('LayoutCreatorPage', () => {
  let component: LayoutCreatorPage;
  let fixture: ComponentFixture<LayoutCreatorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCreatorPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
