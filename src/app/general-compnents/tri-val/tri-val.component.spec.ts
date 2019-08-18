import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriValComponent } from './tri-val.component';

describe('TriValComponent', () => {
  let component: TriValComponent;
  let fixture: ComponentFixture<TriValComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriValComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
