import { useDocumentDataOnce } from "react-firehooks";
import { db } from "@/connections/firebase";
import { doc } from "firebase/firestore";
import { useMemo } from "react";

type TExperienceTheNightDesc = {
  title: string;
  description: string;
  button: string;
};

export const useExperienceTheNightCopyWritings = () => {
  const [docSnap, loading, error] = useDocumentDataOnce(
    doc(db, "experience-the-night", "popup")
  );

  const copyWritings: TExperienceTheNightDesc = useMemo(() => {
    if (docSnap) {
      return {
        title: docSnap.title,
        description: docSnap.description,
        button: docSnap.button,
      };
    } else {
      return {
        title: "COME JOIN US!",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget.",
        button: "COME JOIN US",
      };
    }
  }, [docSnap]);

  return {
    copyWritings,
    loading,
    error,
  };
};
