import BackButton from "@/components/Atoms/BackButton";
import LineBreak from "@/components/Atoms/LineBreak";
import HumanFactor from "@/components/Organisms/HumanFactor";
import ShowCase from "@/components/Organisms/ShowCase";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { SoldierShowcaseProps } from "@/interfaces/solder-showcase";
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
import { collection, CollectionReference, doc } from "firebase/firestore";
import React from "react";
import { useDocumentData } from "react-firehooks";
import { useOnClickTracking } from "@/hooks/trackings";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const soldierStrongRef = collection(
  db,
  "soldier-strong"
) as CollectionReference<SoldierShowcaseProps>;

const SoldierShowCase = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const [data] = useDocumentData(doc(soldierStrongRef, "soldier-showcase"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: "/soldier-strong/soldiers-showcase",
      title: "Soldier Strong Soldier Showcase",
    },
  });

  return (
    <Layout title="Soldier Strong Fitness Corner">
      {data && (
        <Box
          h="100%"
          w="100%"
          pos="relative"
          px={{ base: "0", md: "50px", lg: "20%" }}
        >
          <BackButton
            withLabel
            top={["85px", "145px"]}
            left={["-10px", "0"]}
            isFloating
          />
          <Tabs colorScheme="green">
            <Center>
              <TabList
                overflow={isDesktop ? "undefined" : "scroll"}
                overflowY="hidden"
                maxW={isDesktop ? "unset" : "80%"}
                ml={isDesktop ? "none" : "auto"}
                borderBottom="none"
                fontSize={{ base: "sm", md: "lg" }}
                gap={{ base: 0, md: 10 }}
                zIndex="sticky"
              >
                <Tab
                  borderBottom="none"
                  color="#C0BE9A"
                  _focus={{}}
                  _active={{ borderBottom: "none" }}
                  minWidth={{ base: 220, md: 400 }}
                  _selected={{
                    color: "brand.crete",
                  }}
                >
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 14, md: "md" }}
                    minWidth={{ base: 220, md: 400 }}
                  >
                    EVOLUTION OF SOLDIER PERSONAL EQUIPMENT
                  </Text>
                </Tab>
                <Tab
                  minW="222px"
                  padding="0"
                  borderBottom="none"
                  color="#C0BE9A"
                  _focus={{}}
                  minWidth={{ base: 220, md: 400 }}
                  _active={{ borderBottom: "none" }}
                  _selected={{
                    color: "brand.crete",
                  }}
                >
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 14, md: "md" }}
                    minWidth={{ base: 220, md: 400 }}
                  >
                    HUMAN FACTORS ENGINEERING: SOLDIER FIRST!
                  </Text>
                </Tab>
              </TabList>
            </Center>

            <TabPanels>
              <TabPanel paddingTop={{ base: "20px", md: "40px" }}>
                {/* <Heading
                  fontSize={{ base: "20px", md: "30px" }}
                  color="#2E4924"
                  textAlign="center"
                  textTransform="uppercase"
                  mb="30px"
                > */}
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {/* SOLDIER'S SHOWCASE
                </Heading> */}
                <ShowCase data={data.data} />
              </TabPanel>
              <TabPanel
                // borderTop="1px solid"
                paddingTop={{ base: "20px", md: "30px" }}
                marginTop={{ base: "10px", md: "20px" }}
              >
                <HumanFactor
                  preDesign={data.preDesign}
                  data={data.data}
                  firstPrototype={data.firstPrototype}
                  finalProduct={data.finalProduct}
                />
                <Box width="100%">
                  <LineBreak />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Layout>
  );
};

export default SoldierShowCase;
