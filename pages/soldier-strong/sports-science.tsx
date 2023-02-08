import BackButton from "@/components/Atoms/BackButton";
import LineBreak from "@/components/Atoms/LineBreak";
import SoldierSportScienceCarousel from "@/components/Organisms/SPortScienceCarousel";
import SportScienceHeartRate from "@/components/Organisms/SportScienceHeartRate";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import {
  Box,
  Center,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import isNil from "lodash/isNil";
import { useRouter, withRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useOnClickTracking } from "@/hooks/trackings";

interface TDataSportScience {
  heartRateZoneTraining: {
    title: string;
    content: {
      title: string;
      desc: string;
      url: string;
      type: string;
    };
  };
  nutrionSupplements: {
    title: string;
    content: [
      {
        title: string;
        url: string;
        type: string;
        desc: string;
        sequence: number;
      }
    ];
  };
  resilienceSkills: {
    title: string;
    content: [
      {
        title: string;
        url: string;
        type: string;
        desc: string;
        sequence: number;
      }
    ];
  };
}

const SportsScience = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  const router = useRouter();
  const [detail, setDetail] = useState<TDataSportScience | null>(null);

  useEffect(() => {
    async function fetchMyAPI() {
      const docRef = doc(db, "soldier-strong", "sports-science");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as TDataSportScience;
        setDetail(data);
      }
    }
    fetchMyAPI();
  }, []);

  useOnClickTracking({
    isClicked: detail !== undefined,
    type: "hotspot",
    data: {
      slug: "/soldier-strong/soldiers-science",
      title: "Soldier Strong Soldier Science",
    },
  });

  return (
    <Layout title="Sports Science">
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
              borderBottom="none"
              ml={{ base: "50px", md: "0" }}
              fontSize={{ base: "sm", md: "lg" }}
              w="auto"
              overflowX="auto"
              overflowY="hidden"
              marginTop={{
                xl: "-8px",
              }}
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
                fontSize={{ base: "sm", md: "lg" }}
              >
                <Text
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontWeight="bold"
                >
                  NUTRITION SUPPLEMENTS
                </Text>
              </Tab>
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.crete",
                }}
                fontSize={{ base: "sm", md: "lg" }}
              >
                <Text
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontWeight="bold"
                >
                  HEART RATE ZONE TRAINING
                </Text>
              </Tab>
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{}}
                _active={{ borderBottom: "none" }}
                _selected={{
                  color: "brand.crete",
                }}
                fontSize={{ base: "sm", md: "lg" }}
              >
                <Text
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontWeight="bold"
                >
                  RESILIENCE SKILLS
                </Text>
              </Tab>
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel padding="0px">
              {!isNil(detail) && detail !== null && (
                <Stack
                  pt={{
                    base: "3rem",
                    md: "4rem",
                  }}
                  pb={{
                    base: "2rem",
                    md: "4rem",
                  }}
                  direction="column"
                >
                  <Heading
                    fontSize={{ base: "20px", md: "30px" }}
                    color="brand.green"
                    textAlign="center"
                    textTransform="uppercase"
                    pb={{
                      base: "2rem",
                      md: "3rem",
                    }}
                  >
                    {detail.nutrionSupplements.title}
                  </Heading>
                  <SoldierSportScienceCarousel
                    data={detail.nutrionSupplements.content.sort(
                      (a, b) => a.sequence - b.sequence
                    )}
                  />
                </Stack>
              )}
            </TabPanel>
            <TabPanel padding="0px">
              {!isNil(detail) && detail !== null && (
                <Fragment>
                  <SportScienceHeartRate data={detail.heartRateZoneTraining} />
                  <Box width="100%" height="20px">
                    <LineBreak />
                  </Box>
                </Fragment>
              )}
            </TabPanel>
            <TabPanel padding="0px">
              {!isNil(detail) && detail !== null && (
                <Stack
                  pt={{
                    base: "3rem",
                    md: "4rem",
                  }}
                  pb={{
                    base: "2rem",
                    md: "4rem",
                  }}
                  direction="column"
                >
                  <Heading
                    fontSize={{ base: "20px", md: "30px" }}
                    color="brand.green"
                    textAlign="center"
                    textTransform="uppercase"
                    pb={{
                      base: "2rem",
                      md: "3rem",
                    }}
                  >
                    {detail.resilienceSkills.title}
                  </Heading>
                  <SoldierSportScienceCarousel
                    data={detail.resilienceSkills.content.sort(
                      (a, b) => a.sequence - b.sequence
                    )}
                  />
                </Stack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default withRouter(SportsScience);
