import { Component, OnInit } from '@angular/core';
import {extendedStreetViewPanoramaOptions, Pos, Puzzle} from '../../types';
import { googleMapsApiKey } from '../../../environments/config';
import { } from '@types/googlemaps';
import { StreetViewService } from '../../services/street-view/street-view.service';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-create-puzzle-view',
  templateUrl: './create-puzzle-view.component.html',
  styleUrls: ['./create-puzzle-view.component.css']
})
export class CreatePuzzleViewComponent implements OnInit {

  initialAddress = '';
  addressSearchInProgress = false;

  puzzle: Puzzle = {
    title: '',
    question: '',
    answers: [''],
    pos: {
      lat: 0,
      lng: 0,
      heading: 0,
      pitch: 0,
    }
  };


  panoramaOptions: extendedStreetViewPanoramaOptions = {
    position: { lat: 42.345573, lng: -71.098326 },
    pov: { heading: 0, pitch: 0 },
    disableDefaultUI: true,
    showRoadLabels: false
  };

  apiKey = googleMapsApiKey;

  constructor(
    private streetViewService: StreetViewService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  onPositionChanged( pos: google.maps.LatLng) {
    console.log('onPositionChanged', pos);
    this.puzzle.pos.lat = pos.lat();
    this.puzzle.pos.lng = pos.lng();
  }
  onPovChanged( pov: google.maps.StreetViewPov) {
    this.puzzle.pos.heading = pov.heading;
    this.puzzle.pos.pitch = pov.pitch;
  }

  addAnswer(event) {
    event.preventDefault();
    this.puzzle.answers.push('');
  }
  removeAnswer(index) {
    if (this.puzzle.answers.length > 1) {
      this.puzzle.answers.splice(index, 1);
    }
  }
  trackByFn(index, item) {
    return index;
  }

  searchAddress() {
    this.addressSearchInProgress = true;
    this.streetViewService.searchPos(this.initialAddress)
      .then( pos => {
        this.addressSearchInProgress = false;
        console.log ('Position found:', pos);
        this.panoramaOptions = {
          ...this.panoramaOptions,
          position: pos
        };
      })
      .catch( () => {
        this.addressSearchInProgress = false;
        this.notificationsService.error('Cannot find panorama on that address.')
      });

  }
}
