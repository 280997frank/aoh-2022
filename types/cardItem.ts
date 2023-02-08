export interface ICardItem {
  title: string;
  description: string;
  images: string[];
  thumbnail: string;
  url?: string;
  onClick: () => void;
}
