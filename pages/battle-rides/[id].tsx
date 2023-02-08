import React from "react";
import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import BattleRidesInformation from "@/components/Organisms/BattleRidesInformation";
import Layout from "@/components/Template/Layout";
import { collection, doc, CollectionReference } from "firebase/firestore";
import { useDocumentData } from "react-firehooks/firestore";
import { db } from "@/connections/firebase";
import BattleRidesSpecification from "@/components/Organisms/BattleRidesSpecification";
import { IDetailBattleRides } from "@/types/battleRides";
import { useRouter } from "next/router";
import { useOnClickTracking } from "@/hooks/trackings";

const snapshotListenOptions = {
  snapshotListenOptions: {
    includeMetadataChanges: true,
  },
};

const DetailBattleRides = () => {
  const router = useRouter();

  const url = window.location.pathname.split("/")[2];
  const req = collection(
    db,
    "battle-rides"
  ) as CollectionReference<IDetailBattleRides>;

  const [data, loading] = useDocumentData(doc(req, url), snapshotListenOptions);

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: `/battle-rides/${url}`,
      title: data !== undefined ? data.name : "",
    },
  });

  return (
    <Layout title="Detail Battle Rides" withBackButton>
      <Box
        h="100%"
        w="100%"
        pos="relative"
        // px={{ base: "0", md: "50px", lg: "20rem" }}
      >
        <Tabs align="center" colorScheme="green">
          <Center>
            <TabList
              borderBottom="none"
              ml={{ base: "30px", md: "0" }}
              fontSize={{ base: "sm", md: "lg" }}
              textAlign="center"
              marginTop={{
                xl: "-5px",
              }}
              zIndex="sticky"
            >
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{
                  outline: "none",
                  borderColor: "none",
                  borderBottom: "none",
                }}
                _active={{ borderBottom: "none" }}
              >
                <Text fontWeight="bold">INFORMATION</Text>
              </Tab>
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{
                  outline: "none",
                  borderColor: "none",
                  borderBottom: "none",
                }}
                _active={{ borderBottom: "none" }}
              >
                <Text fontWeight="bold">SPECIFICATION</Text>
              </Tab>
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel paddingX={{ base: "0", md: "50px", lg: "20rem" }}>
              {data && <BattleRidesInformation data={data} loading={loading} />}
            </TabPanel>
            <TabPanel paddingX={{ base: "0", md: "50px", lg: "20rem" }}>
              {data && (
                <BattleRidesSpecification data={data} loading={loading} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box height="80px"></Box>
      </Box>
    </Layout>
  );
};

export default DetailBattleRides;
