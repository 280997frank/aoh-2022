import BackButton from "@/components/Atoms/BackButton";
import Layout from "@/components/Template/Layout";
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

import { db } from "@/connections/firebase";
import CarouselShowCase from "@/components/Organisms/ShowCase";
import { useOnClickTracking } from "@/hooks/trackings";

interface TOurGearsOverTheYears {
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

const ourGearsOverTheYears = collection(
  db,
  "our-gears-over-the-years"
) as CollectionReference<TOurGearsOverTheYears>;

const OurGearsOverTheYears = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  const [dataGarrison] = useDocumentData(
    doc(ourGearsOverTheYears, "garrison"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [dataEquipment] = useDocumentData(
    doc(ourGearsOverTheYears, "equipment"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [dataAtire] = useDocumentData(doc(ourGearsOverTheYears, "atire"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [dataRation] = useDocumentData(doc(ourGearsOverTheYears, "ration"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [dataSymbols] = useDocumentData(doc(ourGearsOverTheYears, "symbols"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useOnClickTracking({
    isClicked:
      dataGarrison !== undefined &&
      dataEquipment !== undefined &&
      dataAtire !== undefined &&
      dataRation !== undefined &&
      dataSymbols !== undefined,
    type: "hotspot",
    data: {
      slug: "/ns55-showcase/zone-1/our-gears-over-the-years",
      title: "NS 55 Showcase Zone 1 Our Gears Over the Years",
    },
  });

  return (
    <Layout title="Our Gears Over The Years">
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
              ml={{ base: "50px", md: "0" }}
              fontSize={{ base: "sm", md: "lg" }}
              w="auto"
              overflowX="auto"
              gap={{ base: 0, md: 20 }}
              maxW={isDesktop ? "unset" : "80%"}
              overflowY="hidden"
              marginTop={{
                xl: "-8px",
              }}
              zIndex="sticky"
              css={{
                "&::-webkit-scrollbar": {
                  width: "1px !important",
                  height: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "1px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: isDesktop ? "#c0be9a" : "transparant",
                  borderRadius: "50px",
                },
              }}
            >
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.tallPoppy",
                }}
                fontSize={{ base: "sm", md: "lg" }}
              >
                <Text fontWeight="bold">GARRISON</Text>
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
                <Text fontWeight="bold">EQUIPMENT</Text>
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
                <Text fontWeight="bold">ATTIRE</Text>
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
                <Text fontWeight="bold">RATION</Text>
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
                <Text fontWeight="bold">SYMBOLS</Text>
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
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            OUR G.E.A.R.S OVER THE YEARS
          </Heading>
          <TabPanels paddingTop={{ base: "17px", lg: "40px" }}>
            <TabPanel>
              {dataGarrison && <CarouselShowCase data={dataGarrison.data} />}
            </TabPanel>
            <TabPanel>
              {dataEquipment && <CarouselShowCase data={dataEquipment.data} />}
            </TabPanel>
            <TabPanel>
              {dataAtire && <CarouselShowCase data={dataAtire.data} />}
            </TabPanel>
            <TabPanel>
              {dataRation && <CarouselShowCase data={dataRation.data} />}
            </TabPanel>
            <TabPanel>
              {dataSymbols && <CarouselShowCase data={dataSymbols.data} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default OurGearsOverTheYears;
