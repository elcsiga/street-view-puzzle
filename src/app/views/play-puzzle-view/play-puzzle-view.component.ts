import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-play-puzzle-view',
  templateUrl: './play-puzzle-view.component.html',
  styleUrls: ['./play-puzzle-view.component.css']
})
export class PlayPuzzleViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  panoramaOptions: google.maps.StreetViewPanoramaOptions = {
    position: { lat: 42.345573, lng: -71.098326 },
    pov: { heading: 34, pitch: 10 }
  };
}
