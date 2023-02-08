export interface TDateTime {
  date: string;
  time: string[];
}
export interface Tdesc {
  desc?: string;
  sequence: number;
  title: string;
  dateTime?: TDateTime[];
}
export interface TImages {
  imgUrl: string;
  sequence: number;
}

export type TBringYourDrone = {
  title: string;
  desc: Tdesc[];
  images: TImages[];
};
