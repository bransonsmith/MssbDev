import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterListItemComponent } from './roster-list-item.component';

describe('RosterListItemComponent', () => {
  let component: RosterListItemComponent;
  let fixture: ComponentFixture<RosterListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
