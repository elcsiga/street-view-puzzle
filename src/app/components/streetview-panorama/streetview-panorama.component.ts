import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-streetview-panorama',
  templateUrl: './streetview-panorama.component.html',
  styleUrls: ['./streetview-panorama.component.css']
})
export class StreetviewPanoramaComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  @Input() panoramaOptions: google.maps.StreetViewPanoramaOptions = {
    position: { lat: 42.345573, lng: -71.098326 },
    pov: { heading: 34, pitch: 10 }
  };

  @Input() apiKey: string = null;
  constructor() {
  }

  private loadScript(src, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = () => callback();

    const firstScriptOnPage = document.getElementsByTagName('script')[0];
    firstScriptOnPage.parentNode.insertBefore(script, firstScriptOnPage);
  }

  ngOnInit() {

    let url = 'https://maps.googleapis.com/maps/api/js';
    if (this.apiKey)
      url += '?key=' + this.apiKey;

    console.log('zzzz', url);

    this.loadScript(url, () => {
      const panorama = new google.maps.StreetViewPanorama(
        this.gmapElement.nativeElement,
        this.panoramaOptions
      );
    });
  }

}
