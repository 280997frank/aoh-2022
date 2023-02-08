export interface TLayout {
  label: string;
}

export interface VenuePropsData {
  mainTitle: any;
  address: string;
  bus: string;
  car: string;
  layoutImage: string;
  information: string;
  mrt: string;
  foot: string;
  sequence: number;
  mapImage: string;
}

export interface VenueData {
  data: VenuePropsData | null;
}
