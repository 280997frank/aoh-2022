import { useDocumentDataOnce } from "react-firehooks";
import { db } from "@/connections/firebase";
import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { TBringYourDrone } from "@/types/droneArena";

export const useBringYourOwnDrone = () => {
  const [docSnap, loading, error] = useDocumentDataOnce(
    doc(db, "drone-arena", "bring-your-own-drone")
  );

  const contentBringYourDrone: TBringYourDrone = useMemo(() => {
    if (docSnap) {
      return {
        title: docSnap.title,
        desc: docSnap.desc,
        images: docSnap.images,
      };
    } else {
      return {
        title: "BRING YOUR OWN DRONE",
        desc: [
          {
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget.",
            sequence: 1,
            title: "Drone Arena",
          },
        ],
        images: [],
      };
    }
  }, [docSnap]);

  return {
    contentBringYourDrone,
    loading,
    error,
  };
};
