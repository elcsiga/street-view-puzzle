import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetviewPanoramaComponent } from './streetview-panorama.component';

describe('StreetviewPanoramaComponent', () => {
  let component: StreetviewPanoramaComponent;
  let fixture: ComponentFixture<StreetviewPanoramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetviewPanoramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetviewPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
