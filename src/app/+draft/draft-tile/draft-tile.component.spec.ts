import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftTileComponent } from './draft-tile.component';

describe('DraftTileComponent', () => {
  let component: DraftTileComponent;
  let fixture: ComponentFixture<DraftTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
