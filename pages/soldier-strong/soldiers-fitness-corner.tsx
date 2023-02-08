import BackButton from "@/components/Atoms/BackButton";
import LineBreak from "@/components/Atoms/LineBreak";
import ContentDetail from "@/components/Molecules/ContentDetail";
import CarouselVideos from "@/components/Organisms/CarouselVideos";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import {
  Box,
  Center,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDocumentData } from "react-firehooks";
import { useOnClickTracking } from "@/hooks/trackings";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface TFitnessCorner {
  equipment: TEquipment[];
  information: TInformation[];
  workout: TEquipment[];
}

interface TEquipment {
  title: string;
  video: string;
}

interface TInformation {
  title: string;
  image: string;
  description: string;
}

interface DataVideo {
  title: string;
  url: string;
}

const FitnessCorner = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const [workout, setWorkout] = useState<DataVideo[]>([]);
  const soldierStrong = collection(
    db,
    "soldier-strong"
  ) as CollectionReference<TFitnessCorner>;
  const [data] = useDocumentData(doc(soldierStrong, "fitnes-corner"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (data) {
      const wo: { title: string; url: string }[] = data.workout.map((item) => {
        return {
          url: item.video,
          title: item.title,
        };
      });
      setWorkout(wo);
    }
  }, [data]);

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: "/soldier-strong/soldiers-fitness-corner",
      title: "Soldier Strong Soldier Fitness Corner",
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
                  _selected={{
                    color: "brand.crete",
                  }}
                >
                  <Text fontWeight="bold">INTRODUCTION</Text>
                </Tab>
                {workout.length >= 1 && (
                  <Tab
                    minW="222px"
                    padding="0"
                    borderBottom="none"
                    color="#C0BE9A"
                    _focus={{}}
                    _active={{ borderBottom: "none" }}
                    _selected={{
                      color: "brand.crete",
                    }}
                  >
                    <Text fontWeight="bold">WORKOUT VIDEO</Text>
                  </Tab>
                )}
              </TabList>
            </Center>

            <TabPanels paddingTop={{ base: "20px", md: "40px" }}>
              <TabPanel>
                {/* <Heading
                  fontSize={{ base: "20px", md: "30px" }}
                  color="#2E4924"
                  textAlign="center"
                  textTransform="uppercase"
                  mb="30px"
                > */}
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {/* SOLDIER'S FITNESS CORNER
                </Heading> */}
                <Box>
                  <ContentDetail title={data?.information[0].title}>
                    <Image
                      src={data?.information[0].image}
                      maxW={{ base: "calc(100% + 100px)", md: "100%" }}
                      alt="image soldier strong"
                      marginX={{ base: -12, md: 0 }}
                    />
                  </ContentDetail>
                  <Box mt="30px" mb="20px">
                    <ContentDetail>
                      <Text
                        color="#2E4924"
                        dangerouslySetInnerHTML={{
                          __html: data?.information[0].description || "",
                        }}
                      />
                    </ContentDetail>
                  </Box>
                  <Box width="100%" height="20px">
                    <LineBreak />
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <Heading
                  fontSize={{ base: "20px", md: "30px" }}
                  color="brand.green"
                  textAlign="center"
                  textTransform="uppercase"
                  mb="30px"
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  SOLDIER'S FITNESS CORNER
                </Heading>
                {workout.length >= 1 && (
                  <CarouselVideos type="video" data={workout} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Layout>
  );
};

export default FitnessCorner;
