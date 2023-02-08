import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDocumentData } from "react-firehooks";
import { collection, CollectionReference, doc } from "firebase/firestore";

import { db } from "@/connections/firebase";

import { snapshotOptions } from "@/constants/collection/core";

interface Zone2Doc {
  isDisabled: boolean;
}

const showcaseRef = collection(
  db,
  "ns55-showcase"
) as CollectionReference<Zone2Doc>;
const zone2Doc = doc(showcaseRef, "zone-2");

export function useNs55Zone2Disabled(): [Zone2Doc | undefined, boolean] {
  const toast = useToast();
  const [data, loading, error] = useDocumentData(zone2Doc, snapshotOptions);

  useEffect(() => {
    if (error) {
      toast({
        title: "Copy Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return [data, loading];
}
