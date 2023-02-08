import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from "@chakra-ui/react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firehooks";

import Layout from "@/components/Template/Layout";
import WHItem from "@/components/Molecules/WHItem";

import { db } from "@/connections/firebase";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import type { Session } from "@/interfaces/sessions";
import { useOnClickTracking } from "@/hooks/trackings";

const sessionsRef = collection(db, "sessions") as CollectionReference<Session>;

const WhatsHappeningPage: FC = () => {
  const [sessions, loading] = useCollectionData(
    query(sessionsRef, orderBy("sequence", "asc")),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );

  useOnClickTracking({
    data: {
      slug: "/whats-happening",
      title: "What's Happening",
    },
    isClicked: sessions !== undefined,
    type: "page",
  });

  return (
    <Layout title="What's Happening">
      <Box>
        <Heading
          color="brand.orange"
          fontSize={{ base: "2xl", lg: "2.5rem" }}
          textAlign="center"
          mb={8}
        >
          WHAT&apos;S HAPPENING
        </Heading>
        {loading ? (
          <Box textAlign="center">
            <Spinner size="xl" />
          </Box>
        ) : (
          <Tabs isLazy variant="unstyled" defaultIndex={2}>
            <TabList justifyContent="center">
              {sessions?.map(({ venue, isDisabled }) => (
                <Tab
                  key={venue}
                  _selected={{ color: "brand.orange" }}
                  color="brand.option"
                  fontWeight="bold"
                  fontSize={{ base: "1.0625rem", lg: "2xl" }}
                  borderBottom="1px solid #C0BE9A"
                  textTransform="uppercase"
                  isDisabled={isDisabled}
                >
                  {venue}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {sessions?.map(({ venue, timeSlots }) => (
                <TabPanel key={venue}>
                  <WHItem timeSlots={timeSlots} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </Layout>
  );
};

export default WhatsHappeningPage;
