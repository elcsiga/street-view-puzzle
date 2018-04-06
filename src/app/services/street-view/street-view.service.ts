import { Injectable } from '@angular/core';
import { Pos } from '../../types';
import { } from '@types/googlemaps';

@Injectable()
export class StreetViewService {

  constructor() { }

  searchPos(address: string): Promise<google.maps.LatLng> {

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
              resolve(streetViewPanoramaData.location.latLng);
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
