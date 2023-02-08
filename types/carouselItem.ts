export interface ICarauselItem {
  type: "image" | "video";
  showThumbnail?: boolean;
  data: {
    url: string;
    title?: string;
    description?: string;
  }[];
  zoneArmy?: string;
  onChangeIndex?: (index: number) => void;
}
