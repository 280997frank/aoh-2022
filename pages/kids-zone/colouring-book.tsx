import ColouringBookMobileSection from "@/components/Organisms/Zone3/ColouringBookMobileSection";
import ColouringBookSection from "@/components/Organisms/Zone3/ColouringBookSection";
import Layout from "@/components/Template/Layout";
import { snapshotOptions } from "@/constants/collection/core";
import {
  kidsVirtualBookImagesDoc,
  kidsVirtualBookPaletteDoc,
} from "@/constants/collection/kids-zone";
import { useOnClickTracking } from "@/hooks/trackings";
import { IPalette } from "@/types/kids-zone";
import { useMediaQuery, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firehooks";

const ColouringBookPage = () => {
  const toast = useToast();
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const [paletteData, loading, error] = useDocumentData(
    kidsVirtualBookPaletteDoc,
    snapshotOptions
  );
  const [imagesData, imageLoading, imagesError] = useDocumentData(
    kidsVirtualBookImagesDoc,
    snapshotOptions
  );

  useEffect(() => {
    if (error || imagesError) {
      toast({
        title: "Copy Error",
        description: error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast, imagesError]);

  useEffect(() => {
    if (paletteData) {
      const sorted = paletteData.palettes.sort(
        (a, b) => a.position - b.position
      );
      setPalettes(sorted);
    }
  }, [paletteData]);

  useOnClickTracking({
    isClicked: imagesData !== undefined,
    type: "zones",
    data: {
      slug: "/kids-zone/colouring-book",
      title: "Kids Zone's Colouring Book Page",
    },
  });

  return (
    <Layout title="Virtual Colouring Book" withBackButton>
      {paletteData && imagesData ? (
        isDesktop ? (
          <ColouringBookSection
            data={{
              palettes,
              images: imagesData.images,
            }}
          />
        ) : (
          <ColouringBookMobileSection
            data={{
              palettes: paletteData.palettes,
              images: imagesData.images,
            }}
          />
        )
      ) : null}
    </Layout>
  );
};

export default ColouringBookPage;
