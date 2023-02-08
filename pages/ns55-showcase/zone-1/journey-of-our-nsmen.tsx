import BackButton from "@/components/Atoms/BackButton";
import CarouselShowCase from "@/components/Organisms/ShowCase";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { useOnClickTracking } from "@/hooks/trackings";
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
import React from "react";
import { useDocumentData } from "react-firehooks";

interface TJourneyOfOurNsmen {
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

const JourneyOfOurNsmen = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  const journyOfOurNsmen = collection(
    db,
    "journey-of-our-nsmen"
  ) as CollectionReference<TJourneyOfOurNsmen>;

  const [dataPreEnlistment] = useDocumentData(
    doc(journyOfOurNsmen, "pre-enlistment"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [dataActiveYears] = useDocumentData(
    doc(journyOfOurNsmen, "active-years"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [dataOrnsYears] = useDocumentData(doc(journyOfOurNsmen, "orns-years"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useOnClickTracking({
    isClicked:
      dataPreEnlistment !== undefined &&
      dataActiveYears !== undefined &&
      dataOrnsYears !== undefined,
    type: "hotspot",
    data: {
      slug: "/ns55-showcase/zone-1/journey-of-our-nsmen",
      title: "NS 55 Showcase Zone 1 Journey of Our NS Men",
    },
  });

  return (
    <Layout title="Journey Of Our Nsmen">
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
                <Text fontWeight="bold">PRE-ENLISTMENT</Text>
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
                <Text fontWeight="bold">NSF YEARS</Text>
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
                <Text fontWeight="bold">NSMEN YEARS</Text>
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
            JOURNEY OF OUR NSMEN
          </Heading>
          <TabPanels paddingTop={{ base: "17px", lg: "40px" }}>
            <TabPanel>
              {dataPreEnlistment && (
                <CarouselShowCase data={dataPreEnlistment.data} />
              )}
            </TabPanel>
            <TabPanel>
              {dataActiveYears && (
                <CarouselShowCase data={dataActiveYears.data} />
              )}
            </TabPanel>
            <TabPanel>
              {dataOrnsYears && <CarouselShowCase data={dataOrnsYears.data} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box height={10} />
      </Box>
    </Layout>
  );
};

export default JourneyOfOurNsmen;
