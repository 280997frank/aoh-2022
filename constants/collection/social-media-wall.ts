import { db } from "@/connections/firebase";
import { collection, CollectionReference, doc } from "firebase/firestore";

export function socialMediaCol<T>(): CollectionReference<T> {
  return collection(db, "social-media-wall") as CollectionReference<T>;
}

const socialMedia = socialMediaCol<{
  scripts: string[];
  embeds: string[];
}>();

export const kidsZoneSocialMedia = doc(socialMedia, "kid-zone-gallery");
