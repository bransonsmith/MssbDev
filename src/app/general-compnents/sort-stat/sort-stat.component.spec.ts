import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortStatComponent } from './sort-stat.component';

describe('SortStatComponent', () => {
  let component: SortStatComponent;
  let fixture: ComponentFixture<SortStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
