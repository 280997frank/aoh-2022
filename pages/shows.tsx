import React, { FC, useEffect, useState } from "react";
import { Heading, Box, useMediaQuery } from "@chakra-ui/react";
import { db } from "@/connections/firebase";
import {
  collection,
  orderBy,
  query,
  CollectionReference,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCollectionData } from "react-firehooks";
import Show from "components/Molecules/Show";
import Layout from "@/components/Template/Layout";
// import BackButton from "@/components/Atoms/BackButton";

interface IShowDataList {
  title: string;
  description: string;
  date: any;
  location: string;
  streamType: string;
  streamUrl: string;
  sequence: number;
  isLive: boolean;
  isDoneLive: boolean;
  slidoUrl: string;
}

const showDataListRef = collection(
  db,
  "show-list"
) as CollectionReference<IShowDataList>;

const snapshotListenOptions = {
  snapshotListenOptions: {
    includeMetadataChanges: true,
  },
};

const ShowPage: FC = () => {
  const router = useRouter();
  const [updatedShowList, setUpdatedShowList] = useState<IShowDataList[]>([]);
  const [showList] = useCollectionData(
    query(showDataListRef, orderBy("date", "desc")),
    snapshotListenOptions
  );

  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  useEffect(() => {
    if (showList) {
      setUpdatedShowList(showList);
      const intervalId = window.setInterval(() => {
        const updated = [...updatedShowList];
        const currentTimestamp = Math.round(new Date().getTime() / 1000);

        updatedShowList?.map((show, index) => {
          updated[index].isLive =
            currentTimestamp >= show.date.seconds &&
            show.streamType === "livestream";
          setUpdatedShowList(updated);
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [showList, updatedShowList]);

  return (
    <Layout
      title="Shows"
      withBackButton
      backButtonAction={() => router.push("/")}
    >
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "0", md: "50px", lg: "20%" }}
      >
        {updatedShowList.length === 0 ? (
          <></>
        ) : (
          <>
            <Box
              w={{ base: "85%", md: "38em", lg: "35em", xl: "43em" }}
              marginTop={{
                base: "60px",
                lg: "100px",
              }}
              mx="auto"
            >
              <Heading
                fontWeight="bold"
                fontSize={{
                  base: "2xl",
                  lg: "4xl",
                }}
                color="brand.green"
                w="full"
                textAlign={{
                  base: "center",
                  lg: "center",
                }}
                mt={{
                  base: "10px",
                  lg: "0px",
                }}
                mb={10}
              >
                SHOWS
              </Heading>
              <Show shows={updatedShowList} />
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default ShowPage;
