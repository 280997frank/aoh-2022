import { ICaptureYourNSMomentsTermProps } from "@/components/Molecules/TermAndConditionsModal";
import About, {
  ICaptureYourNSMomentsAboutProps,
} from "@/components/Organisms/CaptureYourNSMoments/About";
import Categories, {
  ICaptureYourNSMomentsCategoriesProps,
} from "@/components/Organisms/CaptureYourNSMoments/Categories";
import Faq, {
  ICaptureYourNSMomentsFaqProps,
} from "@/components/Organisms/CaptureYourNSMoments/Faq";
import Instructions, {
  ICaptureYourNSMomentsInstructionsProps,
} from "@/components/Organisms/CaptureYourNSMoments/Instructions";
import SubmitStories from "@/components/Organisms/CaptureYourNSMoments/SubmitStories";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { useOnClickTracking } from "@/hooks/trackings";
import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import React, { useState } from "react";
import { useCollectionData } from "react-firehooks/firestore";

export default function CaptureYourNSMoments() {
  const query = collection(db, "capture-your-ns-moments");
  const [data, loading, error] = useCollectionData(query);
  const [tabIndex, setTabIndex] = useState(0);

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "zones",
    data: {
      slug: "/ns55-showcase/zone-3",
      title: "NS 55 Showcase Zone 3",
    },
  });

  return (
    <Layout title="Capture your NS moments" withBackButton>
      <Box
        h="100%"
        w="100%"
        px={{ base: "0", md: "50px", lg: "9rem", "2xl": "20%" }}
        mt="0"
        id="top"
      >
        <Tabs
          colorScheme="orange"
          onChange={(index) => setTabIndex(index)}
          index={tabIndex}
          id="capture-ns-story-moment-id"
        >
          <Center>
            <TabList
              borderBottom="none"
              ml={{ base: "50px", md: "0" }}
              fontSize={{ base: "sm", md: "lg" }}
              overflowX={{ base: "scroll", lg: "hidden" }}
              overflowY="hidden"
              zIndex="sticky"
            >
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{
                  outline: "none",
                  borderColor: "none",
                  borderBottom: "none",
                  color: "red",
                }}
                _active={{ borderBottom: "none" }}
              >
                <Text fontWeight="bold">ABOUT</Text>
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
                whiteSpace="nowrap"
              >
                <Text fontWeight="bold">SUBMIT STORIES</Text>
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
                <Text fontWeight="bold">INSTRUCTIONS</Text>
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
                <Text fontWeight="bold">CATEGORIES</Text>
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
                <Text fontWeight="bold">FAQ</Text>
              </Tab>
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel>
              {data && (
                <About
                  data={data[0] as ICaptureYourNSMomentsAboutProps}
                  goToForm={() => {
                    setTabIndex(1);
                    document
                      .getElementById("capture-ns-story-moment-id")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                />
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <SubmitStories
                  categories={data[1] as ICaptureYourNSMomentsCategoriesProps}
                  terms={data[4] as ICaptureYourNSMomentsTermProps}
                />
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <Instructions
                  data={data[3] as ICaptureYourNSMomentsInstructionsProps}
                />
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <Categories
                  data={data[1] as ICaptureYourNSMomentsCategoriesProps}
                />
              )}
            </TabPanel>
            <TabPanel>
              {data && (
                <Faq
                  data={data[2] as ICaptureYourNSMomentsFaqProps}
                  goToForm={() => {
                    setTabIndex(1);
                    document
                      .getElementById("capture-ns-story-moment-id")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
}
