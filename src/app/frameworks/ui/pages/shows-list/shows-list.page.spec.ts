import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsListPage } from './shows-list.page';

describe('ShowsListPage', () => {
  let component: ShowsListPage;
  let fixture: ComponentFixture<ShowsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
