import React from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import BackButton from "@/components/Atoms/BackButton";
import Layout from "@/components/Template/Layout";
// import { useRouter } from "next/router";
import BackgroundNsItem from "@/components/Molecules/BackgroundNsItem";
import { useCollectionData } from "react-firehooks";
import {
  collection,
  CollectionReference,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/connections/firebase";
import _ from "lodash";
import { useOnClickTracking } from "@/hooks/trackings";

interface IBackgroundOfNsItem {
  description: string;
  title: string;
  image: string;
}

interface IBackgroundOfNsContent {
  data: IBackgroundOfNsItem[];
  year: string;
}

const BackgroundOfNsContent = () => {
  // const [isDesktop] = useMediaQuery(
  //   "(min-width: 48em) and (orientation: landscape)"
  // );
  // const route = useRouter();

  const getCollection = collection(db, "background-of-ns");
  const q = query(getCollection, orderBy("year", "asc"));

  const [data, loading, error] = useCollectionData(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  let numIndex = 0;
  let years = "0";
  let year = "0";

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: "/ns55-showcase/zone-1/background-of-ns",
      title: "NS 55 Showcase Zone 1 Background of NS",
    },
  });

  return (
    <Layout title="Background of National Service">
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "26px", md: "50px", lg: "20rem" }}
      >
        <BackButton
          withLabel
          top={["85px", "145px"]}
          left={["-10px", "0"]}
          isFloating
        />
        <Heading
          fontSize={{ base: "20px", md: "30px" }}
          color="brand.green"
          mb={{ base: "10px", md: "30px" }}
          textTransform="uppercase"
          textAlign="center"
        >
          Background Of National Service
        </Heading>
        <Center alignItems="center">
          <Box display="flex" flexDir="column" pl="10px">
            {data &&
              data.map((list, iList) => {
                if (list.data.length < 1) {
                  return (
                    <BackgroundNsItem
                      imageRightPosition={!!(numIndex % 2)}
                      key={iList}
                      data={{
                        year: list.year,
                      }}
                    />
                  );
                }
                return list.data.map((item: IBackgroundOfNsItem, i: number) => {
                  year = list.year === years ? "" : `${list.year}`;
                  years = list.year;
                  numIndex += 1;
                  return (
                    <BackgroundNsItem
                      imageRightPosition={!!(numIndex % 2)}
                      key={i}
                      data={{
                        year,
                        title: item.title,
                        description: item.description,
                        image: item.image,
                      }}
                    />
                  );
                });
              })}
          </Box>
        </Center>
      </Box>
    </Layout>
  );
};

export default BackgroundOfNsContent;
