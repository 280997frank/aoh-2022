import BackButton from "@/components/Atoms/BackButton";
import IGFilterMobileSection from "@/components/Organisms/Zone3/IGFilterMobileSection";
import IGFilterSection from "@/components/Organisms/Zone3/IGFilterSection";
import Layout from "@/components/Template/Layout";
import { snapshotOptions } from "@/constants/collection/core";
import { kidsIgFilterDoc } from "@/constants/collection/kids-zone";
import { useOnClickTracking } from "@/hooks/trackings";
import { Box, useMediaQuery, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firehooks";

const IGFilterPage = () => {
  const toast = useToast();
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const [track, setTracker] = useState(false);

  const [data, loading, error] = useDocumentData(
    kidsIgFilterDoc,
    snapshotOptions
  );

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

  useEffect(() => {
    if (track) {
      setTracker(false);
    }
  }, [track]);

  useOnClickTracking({
    data: {
      slug: "/kids-zone/ig-filter",
      title: "IG Filter",
    },
    isClicked: track,
    type: "ig-filter",
  });

  return (
    <Layout title="IG Filter" withBackButton>
      {data ? (
        isDesktop ? (
          <IGFilterSection data={data} setTracker={() => setTracker(true)} />
        ) : (
          <IGFilterMobileSection
            data={data}
            setTracker={() => setTracker(true)}
          />
        )
      ) : null}
    </Layout>
  );
};

export default IGFilterPage;
