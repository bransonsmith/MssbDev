import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchUpComponent } from './match-up.component';

describe('MatchUpComponent', () => {
  let component: MatchUpComponent;
  let fixture: ComponentFixture<MatchUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
