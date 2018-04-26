export interface Pos {
  lat: number;
  lng: number;
  heading: number;
  pitch: number;
}


export interface Puzzle {
  id: string;
  data: PuzzleData;
}

export interface PuzzleData {
  title: string;
  tags: any;
  question: string;
  answers: string[];
  pos: Pos;
}

export interface Solving {
  puzzleId: string;
  userId: string;
  solvedAnswer: string;
}

export interface ExtendedStreetViewPanoramaOptions extends google.maps.StreetViewPanoramaOptions {
  showRoadLabels?: boolean;
}

