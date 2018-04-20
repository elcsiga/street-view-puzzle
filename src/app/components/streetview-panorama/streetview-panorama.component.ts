import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-streetview-panorama',
  templateUrl: './streetview-panorama.component.html',
  styleUrls: ['./streetview-panorama.component.css']
})
export class StreetviewPanoramaComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  streetView: google.maps.StreetViewPanorama;

  @Input() panoramaOptions: google.maps.StreetViewPanoramaOptions = {
    position: { lat: 42.345573, lng: -71.098326 },
    pov: { heading: 34, pitch: 10 }
  };

  @Input() apiKey: string = null;

  @Output() positionChanged = new EventEmitter<google.maps.LatLng>();
  @Output() povChanged = new EventEmitter<google.maps.StreetViewPov>();

  constructor() {
  }

  private loadScript(src, callback) {
    if (typeof window['google'] === 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => callback();

      const firstScriptOnPage = document.getElementsByTagName('script')[0];
      firstScriptOnPage.parentNode.insertBefore(script, firstScriptOnPage);
    } else {
      callback();
    }
  }

  ngOnInit() {
    let url = 'https://maps.googleapis.com/maps/api/js';
    if (this.apiKey) {
      url += '?key=' + this.apiKey;
    }

    this.loadScript(url, () => {
      this.streetView = new google.maps.StreetViewPanorama(
        this.gmapElement.nativeElement,
        this.panoramaOptions
      );

      this.streetView.addListener('position_changed', () => {
        if (this.positionChanged) {
          this.positionChanged.emit(this.streetView.getPosition());
        }
      });

      this.streetView.addListener('pov_changed', () => {
        if (this.povChanged) {
          this.povChanged.emit(this.streetView.getPov());
        }
      });
    });
  }

  ngOnChanges( changes: SimpleChanges) {
    if (this.streetView && changes.panoramaOptions) {
      this.streetView.setOptions(changes.panoramaOptions.currentValue);
    }
  }

  ngOnDestroy() {
    if (this.streetView) {
      google.maps.event.clearInstanceListeners(this.streetView);
    }
  }

}
