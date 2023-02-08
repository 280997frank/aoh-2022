export interface IKidsZoneProps<T> {
  data: T;
  setTracker?: () => void;
}

export type TKidsZone<T> = React.FC<IKidsZoneProps<T>>;

export interface ILandingProps {
  image: string;
}
export interface IIGfilter {
  description: string;
  title: string;
  url: string;
  btnLabel: string;
  image: string;
}

export interface IPalette {
  hexcode: string;
  position: number;
}
export interface IVirtualBookPalette {
  palettes: IPalette[];
}

export interface IVirtualBookImage {
  images: string[];
}

export type TVirtualBook = IVirtualBookPalette & IVirtualBookImage;

export interface IDrawingPaletteProps {
  onSelectColor: (color: string) => void;
  palettes: IPalette[];
}
interface IPaletteProps {
  handleColorClick: (color: string) => void;
  palettes: IPalette[];
}

export type TDrawingPalette = React.FC<IDrawingPaletteProps>;
export type TPalette = React.FC<IPaletteProps>;

export interface ISwipersProps {
  images: string[];
  onClick: (index: number) => void;
  slidesPerView: number;
  selectedIndex: number;
}

export interface ISwiperNavigationProps {
  swiperRef: React.Ref<HTMLDivElement> | null;
  img: string;
  isLeft: boolean;
  pos: string;
  fromTop: string;
  width?: string;
}

export type TSwiperNavigation = React.FC<ISwiperNavigationProps>;
export type TSwipers = React.FC<ISwipersProps>;
