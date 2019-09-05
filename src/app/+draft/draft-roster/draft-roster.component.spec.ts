import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftRosterComponent } from './draft-roster.component';

describe('DraftRosterComponent', () => {
  let component: DraftRosterComponent;
  let fixture: ComponentFixture<DraftRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
