import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRectComponent } from './character-rect.component';

describe('CharacterRectComponent', () => {
  let component: CharacterRectComponent;
  let fixture: ComponentFixture<CharacterRectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterRectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
