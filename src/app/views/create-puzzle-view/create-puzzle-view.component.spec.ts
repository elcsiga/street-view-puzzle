import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePuzzleViewComponent } from './create-puzzle-view.component';

describe('CreatePuzzleViewComponent', () => {
  let component: CreatePuzzleViewComponent;
  let fixture: ComponentFixture<CreatePuzzleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePuzzleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePuzzleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
