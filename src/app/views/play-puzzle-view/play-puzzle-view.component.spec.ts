import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPuzzleViewComponent } from './play-puzzle-view.component';

describe('PlayPuzzleViewComponent', () => {
  let component: PlayPuzzleViewComponent;
  let fixture: ComponentFixture<PlayPuzzleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayPuzzleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPuzzleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
