import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit} from '@angular/core';
import { extendedStreetViewPanoramaOptions, Puzzle } from '../../types';
import { googleMapsApiKey } from '../../../environments/config';
import { } from '@types/googlemaps';
import { StreetViewService } from '../../services/street-view/street-view.service';
import { NotificationsService } from '../../services/notifications/notifications.service';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import {MatChipInputEvent} from '@angular/material';

import {ENTER, COMMA, SPACE} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-create-puzzle-view',
  templateUrl: './create-puzzle-view.component.html',
  styleUrls: ['./create-puzzle-view.component.scss']
})
export class CreatePuzzleViewComponent implements OnInit, OnDestroy, AfterViewInit {

  panoramaData: google.maps.StreetViewPanoramaData | boolean | null = null;
  addressSearchInProgress = false;
  puzzleCreationInProgress = false;

  private sub: Subscription;

  puzzle: Puzzle = {
    title: '',
    tags: [],
    question: '',
    answers: [''],
    pos: {
      lat: 0,
      lng: 0,
      heading: 0,
      pitch: 0,
    }
  };

  @ViewChild('address') addressInput: ElementRef;

  panoramaOptions: extendedStreetViewPanoramaOptions = {
    position: { lat: 42.345573, lng: -71.098326 },
    pov: { heading: 0, pitch: 0 },
    disableDefaultUI: true,
    showRoadLabels: false
  };

  apiKey = googleMapsApiKey;

  tagSeparatorCodes = [ ENTER, COMMA, SPACE]
  constructor(
    private streetViewService: StreetViewService,
    private notificationsService: NotificationsService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {

    this.sub = fromEvent(this.addressInput.nativeElement, 'keyup')
      .pipe(map(i => (i as any).target.value))
      .pipe(debounceTime(500))
      .subscribe(address => {
        this.addressSearchInProgress = true;
        this.streetViewService.searchPos(address)
          .then( panoramaData => {
            this.addressSearchInProgress = false;
            this.panoramaData = panoramaData;
            this.panoramaOptions = {
              ...this.panoramaOptions,
                position: panoramaData.location.latLng
            };
          })
          .catch( () => {
            this.panoramaData = false;
            this.addressSearchInProgress = false;
            this.notificationsService.error('Cannot find panorama on that address.');
          });
      });

  }

  onPositionChanged( pos: google.maps.LatLng) {
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
    if (index > 0) {
      this.puzzle.answers.splice(index, 1);
    }
  }
  trackByFn(index, item) {
    return index;
  }

  isQAcomplete(): boolean {
    return this.puzzle.title.length && this.puzzle.question.length
      && this.puzzle.answers.reduce( (valid, answer) => valid && !!answer.length, true);

  }

  getAddressDescription(): string {
    return this.panoramaData ? (this.panoramaData as google.maps.StreetViewPanoramaData).location.description : '';
  }

  savePuzzle() {
    this.puzzleCreationInProgress = true;
    this.db.collection('puzzles').add( this.puzzle )
      .then( puuzzleRef => {
        this.puzzleCreationInProgress = false;
        this.notificationsService.info('Puzzle successfully created');
        this.router.navigate(['/']);
      })
      .catch( error => {
        this.puzzleCreationInProgress = false;
        this.notificationsService.error('Error while creating puzzle.');
      });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.puzzle.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: any): void {
    const index = this.puzzle.tags.indexOf(tag);

    if (index >= 0) {
      this.puzzle.tags.splice(index, 1);
    }
  }

  getStaticImage() {
    return this.streetViewService.getStaticImageUrlOf(this.puzzle)
  }
}
