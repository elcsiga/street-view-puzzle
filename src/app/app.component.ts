import {Component, Input} from '@angular/core';
import {googleMapsApiKey, googleStreetViewImageApiKey} from "../environments/config";
import {extendedStreetViewPanoramaOptions} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  panoramaOptions: extendedStreetViewPanoramaOptions = {
    position: { lat: 42.345573, lng: -71.098326 },
    pov: { heading: 0, pitch: 0 },
    disableDefaultUI: true,
    showRoadLabels: false
  };

  apiKey = googleMapsApiKey;

  private getImageUrl(lat, lng, heading, pitch, apiKey) {
    return `https://maps.googleapis.com/maps/api/streetview?size=640x480&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&key=${apiKey}`;
  }

  testImgUrl(opts: extendedStreetViewPanoramaOptions) {
    return this.getImageUrl(
      opts.position.lat,
      opts.position.lng,
      opts.pov.heading,
      opts.pov.pitch,
      googleStreetViewImageApiKey
    );

  }
}
