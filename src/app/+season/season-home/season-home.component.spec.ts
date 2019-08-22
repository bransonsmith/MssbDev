import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonHomeComponent } from './season-home.component';

describe('SeasonHomeComponent', () => {
  let component: SeasonHomeComponent;
  let fixture: ComponentFixture<SeasonHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
