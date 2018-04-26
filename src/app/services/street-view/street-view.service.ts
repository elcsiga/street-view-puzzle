import { Injectable } from '@angular/core';
import { Pos, PuzzleData } from '../../types';
import { } from '@types/googlemaps';
import { googleStreetViewImageApiKey } from '../../../environments/config';

@Injectable()
export class StreetViewService {

  constructor() { }

  getStaticImageUrl(lat, lng, heading, pitch, apiKey) {
    return `https://maps.googleapis.com/maps/api/streetview`
      + `?size=480x480&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&key=${apiKey}`;
  }

  getStaticImageUrlOf(puzzle: PuzzleData) {
    return this.getStaticImageUrl(
      puzzle.pos.lat,
      puzzle.pos.lng,
      puzzle.pos.heading,
      puzzle.pos.pitch,
      googleStreetViewImageApiKey
    );

  }
  searchPos(address: string): Promise<google.maps.StreetViewPanoramaData> {

    return new Promise((resolve, reject) => {
      if (!google) {
        reject();
      }
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const pos = results[0].geometry.location;
          const streetViewService = new google.maps.StreetViewService();
          streetViewService.getPanoramaByLocation(pos, 1000, (streetViewPanoramaData, streetViewStatus) => {
            if (streetViewStatus === google.maps.StreetViewStatus.OK) {
              resolve(streetViewPanoramaData);
            } else {
              reject();
            }
          });
        } else {
          reject();
        }
      });
    });
  }
}
