import LineBreak from "@/components/Atoms/LineBreak";
import CarauselItem from "@/components/Organisms/CarouselItem";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { collection, query, where } from "firebase/firestore";
import { withRouter } from "next/router";
import React, { useState } from "react";
import { useCollectionDataOnce } from "react-firehooks/firestore";
import { useOnClickTracking } from "@/hooks/trackings";

const DetailFormation = () => {
  const url = window.location.pathname.split("/")[2];
  const [index, setIndex] = useState<number>(0);
  const req = query(collection(db, "platforms"), where("slug", "==", url));
  const [data] = useCollectionDataOnce(req);

  useOnClickTracking({
    data: {
      slug: url,
      title: data !== undefined ? data[0].title : "",
    },
    isClicked: data !== undefined,
    type: "hotspot",
  });

  return (
    <Layout title="Army Formations" withBackButton>
      <Box h="100%" w="100%" px={{ base: "0", md: "50px", lg: "20%" }}>
        {data && data.length > 0 && (
          <Box paddingTop={20}>
            {typeof data?.[0]?.title === "string" ? (
              <Heading
                fontSize={{ base: "20px", md: "30px" }}
                color="brand.green"
                textAlign="center"
                textTransform="uppercase"
              >
                {data?.[0]?.title}
              </Heading>
            ) : (
              <Heading
                fontSize={{ base: "20px", md: "30px" }}
                color="brand.green"
                textAlign="center"
                textTransform="uppercase"
              >
                {data?.[0]?.title?.[index]}
              </Heading>
            )}
            <CarauselItem
              zoneArmy="platform"
              type="image"
              data={data?.[0]?.images.map((image: string) => {
                return {
                  url: image,
                };
              })}
              onChangeIndex={(i) => setIndex(i)}
            />
            <Box paddingX={8}>
              <Box height="40px" />
              <LineBreak />
              <Box height="20px" />
              <Flex flexDir="column" justifyContent="center">
                <Heading
                  textTransform="uppercase"
                  size="md"
                  py="1rem"
                  color={"brand.jaffa"}
                >
                  Information
                </Heading>
                {typeof data?.[0]?.description === "string" ? (
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: data?.[0]?.description,
                    }}
                  />
                ) : (
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: data?.[0]?.description?.[index],
                    }}
                  />
                )}
              </Flex>
              <Box height="20px" />
              <Flex flexDir="column" justifyContent="center">
                <Heading
                  textTransform="uppercase"
                  size="md"
                  py="1rem"
                  color={"brand.jaffa"}
                >
                  Do You Know
                </Heading>
                {typeof data?.[0]?.doyouknow === "string" ? (
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: data?.[0]?.doyouknow,
                    }}
                  />
                ) : (
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: data?.[0]?.doyouknow?.[index],
                    }}
                  />
                )}
              </Flex>
              <Box height="20px" />
              <Flex flexDir="column" justifyContent="center">
                <Heading
                  textTransform="uppercase"
                  size="md"
                  py="1rem"
                  color={"brand.jaffa"}
                >
                  Specifications
                </Heading>
                {typeof data?.[0]?.spec === "string" ? (
                  <Text
                    paddingBottom="40px"
                    dangerouslySetInnerHTML={{
                      __html: data?.[0]?.spec,
                    }}
                  />
                ) : (
                  <Text
                    paddingBottom="40px"
                    dangerouslySetInnerHTML={{
                      __html: data?.[0]?.spec?.[index],
                    }}
                  />
                )}
              </Flex>
              <Box height="20px">
                <LineBreak />
              </Box>
            </Box>
          </Box>
        )}
        <Box height="80px"></Box>
      </Box>
    </Layout>
  );
};

export default withRouter(DetailFormation);
