import { db } from "@/connections/firebase";
import { IPhotoboothLanding, IPhotoboothPlatforms } from "@/types/photobooth";
import { collection, CollectionReference, doc } from "firebase/firestore";

export function photoboothCol<T>(): CollectionReference<T> {
  return collection(db, "photobooth") as CollectionReference<T>;
}

const landing = photoboothCol<IPhotoboothLanding>();
const platforms = photoboothCol<IPhotoboothPlatforms>();

export const photoboothDoc = doc(landing, "landing");
export const photoboothPlatformsDoc = doc(platforms, "photobooth-platforms");
