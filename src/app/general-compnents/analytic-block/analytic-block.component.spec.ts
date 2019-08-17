import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticBlockComponent } from './analytic-block.component';

describe('AnalyticBlockComponent', () => {
  let component: AnalyticBlockComponent;
  let fixture: ComponentFixture<AnalyticBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
