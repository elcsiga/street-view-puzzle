export interface Pos {
  lat: number;
  lng: number;
  heading: number;
  pitch: number;
}

export interface Puzzle {
  title: string;
  question: string;
  answers: string[];
  pos: Pos;
}

export interface extendedStreetViewPanoramaOptions extends google.maps.StreetViewPanoramaOptions {
  showRoadLabels?: boolean;
}

