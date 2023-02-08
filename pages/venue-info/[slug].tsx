import VenueInfo from "@/components/Molecules/VenueInfo";
import VenueLayout from "@/components/Molecules/VenueLayout";
import Layout from "@/components/Template/Layout";

import { Box, HStack, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useDocumentData } from "react-firehooks";
import { db } from "@/connections/firebase";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import BackButton from "components/Atoms/BackButton";
import { VenuePropsData } from "@/types/venueInfo";

interface VenueProps {
  venues: VenuePropsData[];
}

const VenueRef = collection(
  db,
  "venue-info"
) as CollectionReference<VenueProps>;

const snapshotListenOptions = {
  snapshotListenOptions: {
    includeMetadataChanges: true,
  },
};

const VenuePage: FC = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  const [layoutColor, setLayoutColor] = useState("");
  const [getColor, setGetColor] = useState("");
  const [tab, setTab] = useState(0);
  const [data, setData] = useState({
    mainTitle: ["", ""],
    address: "",
    bus: "",
    car: "",
    layoutImage: "",
    information: "",
    mrt: "",
    foot: "",
    sequence: 0,
    mapImage: "",
  });

  const router = useRouter();
  const { slug } = router.query;

  const [venueData] = useDocumentData(
    doc(VenueRef, "data-detail"),
    snapshotListenOptions
  );

  useEffect(() => {
    if (venueData && slug) {
      const temp = venueData.venues.filter(
        (item) => item.sequence == Number(slug)
      );
      if (temp) {
        setData(temp[0]);
      }
    }
  }, [venueData, slug]);

  useEffect(() => {
    if (tab === 0) {
      setLayoutColor("brand.orange");
      setGetColor("#C0BE9A");
    } else {
      setLayoutColor("#C0BE9A");
      setGetColor("brand.orange");
    }
  }, [tab]);

  return (
    <Layout title="Venue Info">
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "0", md: "50px", lg: "0%" }}
      >
        <VStack width="100%" overflowY="auto">
          <Box
            position="fixed"
            left={{ base: 0, lg: "5%", "2xl": "12%" }}
            zIndex={1}
            top={{
              xl: "8rem",
              "2xl": "9.5rem",
            }}
          >
            <BackButton withLabel={isDesktop ?? false} />
          </Box>
          <HStack
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom={{
              base: "2rem",
              md: "4rem",
            }}
          >
            <Text
              fontSize={18}
              fontWeight="bold"
              marginRight={{
                base: 19,
                md: 20,
              }}
              pr={{ base: 5, md: 5 }}
              color={layoutColor}
              cursor="pointer"
              onClick={() => setTab(0)}
            >
              LAYOUT
            </Text>
            <Text
              fontSize={18}
              fontWeight="bold"
              color={getColor}
              cursor="pointer"
              onClick={() => setTab(1)}
            >
              GETTING HERE
            </Text>
          </HStack>
          {tab === 0 ? (
            <VenueLayout dataVenue={data} />
          ) : (
            <VenueInfo dataVenue={data} />
          )}
        </VStack>
      </Box>
    </Layout>
  );
};

export default VenuePage;
