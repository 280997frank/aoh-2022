import LineBreak from "@/components/Atoms/LineBreak";
import { useOnClickTracking } from "@/hooks/trackings";
import SoldierPrehabContent from "@/components/Organisms/SoldierPrehabContent";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { ISoldierPrehabRehabCorner } from "@/interfaces/soldier-prehab-rehab-corner";
import { Box, Center, Text, useMediaQuery } from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import React, { FC } from "react";
import { useDocumentData } from "react-firehooks/firestore";

const soldierStrongRef = collection(
  db,
  "soldier-strong"
) as CollectionReference<ISoldierPrehabRehabCorner>;

const SoldierPreHabRehabCornerPage: FC = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const [data] = useDocumentData(
    doc(soldierStrongRef, "soldier-prehab-rehab-corner"),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: "/soldier-strong/soldier-prehab",
      title: "Soldier Strong Soldier Prehab",
    },
  });

  return (
    <Layout title="Soldier Prehab" withBackButton>
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "0", md: "50px", lg: "20%" }}
      >
        {data && (
          <Box
            marginTop={{
              base: "50px",
              lg: "100px",
            }}
          >
            <Center>
              <Text
                fontWeight="bold"
                fontSize={{
                  base: "20px",
                  lg: "30px",
                }}
                color="brand.green"
                textAlign="center"
              >
                PRE-HABILITATION {!isDesktop ? <br /> : ""} (PX) EXERCISE
              </Text>
            </Center>
            <SoldierPrehabContent titleTab="px" data={data.px} />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default SoldierPreHabRehabCornerPage;
