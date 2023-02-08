import BackButton from "@/components/Atoms/BackButton";
import CarouselShowCase from "@/components/Organisms/ShowCase";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import {
  Box,
  Center,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
// import BackButton from "@/components/Atoms/BackButton";
// import { PillarOfStrengthProps } from "@/types/pillarOfStrength";
// import PillarOfStrengthContentDetail from "@/components/Organisms/PillarOfStrengthContentDetail";
import { useOnClickTracking } from "@/hooks/trackings";
import React from "react";
import { useDocumentData } from "react-firehooks";

interface TPillarOfStrength {
  data: [
    {
      title: string;
      url: string;
      thumbnail: string;
      type: string;
      description: string;
    }
  ];
}

const PillarOfStrength = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  const pillarOfStrength = collection(
    db,
    "pillar-of-strength"
  ) as CollectionReference<TPillarOfStrength>;

  const [dataAbout] = useDocumentData(doc(pillarOfStrength, "about"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [dataEnlistmentLetter] = useDocumentData(
    doc(pillarOfStrength, "enlistment-letter"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [dataArtefactsOfStrength] = useDocumentData(
    doc(pillarOfStrength, "artefacts-of-strength"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useOnClickTracking({
    isClicked:
      pillarOfStrength !== undefined &&
      dataAbout !== undefined &&
      dataEnlistmentLetter !== undefined &&
      dataArtefactsOfStrength !== undefined,
    type: "hotspot",
    data: {
      slug: "/ns55-showcase/zone-1/pillar-of-strength",
      title: "NS 55 Showcase Zone 1 Pillar of Strength",
    },
  });

  return (
    <Layout title="Pillar Of Strength">
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
        <Tabs>
          <Center>
            <TabList
              borderBottom="none"
              fontSize={{ base: "sm", md: "lg" }}
              gap={{ base: 0, md: 20 }}
              // paddingLeft={{ base: 45, md: 0 }}
              overflowY="hidden"
              ml={isDesktop ? "none" : "auto"}
              maxW={isDesktop ? "unset" : "80%"}
              sx={{
                scrollbarWidth: "none",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              marginTop={{
                xl: "-8px",
              }}
              zIndex="sticky"
            >
              <Tab
                flexShrink={0}
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.tallPoppy",
                }}
              >
                <Text fontWeight="bold">ABOUT</Text>
              </Tab>
              <Tab
                flexShrink={0}
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.tallPoppy",
                }}
              >
                <Text fontWeight="bold">ENLISTMENT LETTER</Text>
              </Tab>
              <Tab
                flexShrink={0}
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.tallPoppy",
                }}
              >
                <Text fontWeight="bold">ARTEFACTS OF STRENGTH</Text>
              </Tab>
            </TabList>
          </Center>
          <Heading
            fontSize={{ base: "20px", md: "30px" }}
            color="#2E4924"
            textAlign="center"
            textTransform="uppercase"
            mt="30px"
          >
            PILLAR OF STRENGTH
          </Heading>
          <TabPanels paddingTop={{ base: "17px", lg: "40px" }}>
            <TabPanel>
              {dataAbout && <CarouselShowCase data={dataAbout.data} />}
            </TabPanel>
            <TabPanel>
              {dataEnlistmentLetter && (
                <CarouselShowCase data={dataEnlistmentLetter.data} />
              )}
            </TabPanel>
            <TabPanel>
              {dataArtefactsOfStrength && (
                <CarouselShowCase data={dataArtefactsOfStrength.data} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box height={10} />
      </Box>
    </Layout>
  );
};

export default PillarOfStrength;
