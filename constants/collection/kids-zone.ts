import { db } from "@/connections/firebase";
import {
  IIGfilter,
  ILandingProps,
  IVirtualBookPalette,
} from "@/types/kids-zone";
import { collection, CollectionReference, doc } from "firebase/firestore";

export function kidsZoneCol<T>(): CollectionReference<T> {
  return collection(db, "kids-zone") as CollectionReference<T>;
}

const landing = kidsZoneCol<ILandingProps>();
const igFilter = kidsZoneCol<IIGfilter>();
const pallete = kidsZoneCol<IVirtualBookPalette>();
const virtualImages = kidsZoneCol<{
  images: string[];
}>();

export const kidsLandingDoc = doc(landing, "landing");
export const kidsIgFilterDoc = doc(igFilter, "ig-filter");
export const kidsVirtualBookPaletteDoc = doc(pallete, "virtual-book-palettes");
export const kidsVirtualBookImagesDoc = doc(
  virtualImages,
  "virtual-book-images"
);
