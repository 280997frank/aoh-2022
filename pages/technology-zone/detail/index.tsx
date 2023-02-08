import LineBreak from "@/components/Atoms/LineBreak";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { collection, query, where } from "firebase/firestore";
import { useRouter, withRouter } from "next/router";
import React from "react";
import { useOnClickTracking } from "@/hooks/trackings";
import { useCollectionDataOnce } from "react-firehooks/firestore";

const DetailTechZone = () => {
  const router = useRouter();
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const req = query(
    collection(db, "technology-zone"),
    where("id", "==", router.query?.id ? router.query.id : "")
  );
  const [data] = useCollectionDataOnce(req);

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data: {
      slug: `/technology-zone/detail?id=${router.query.id}`,
      title: data !== undefined ? data[0]?.name : "",
    },
  });

  return (
    <Layout title="Detail Technology Zone" withBackButton>
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "0", md: "50px", lg: "20%" }}
      >
        {data?.length && (
          <Box
            width="100%"
            p={isDesktop ? "0 10%" : 0}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Text
              textAlign="center"
              mt="15%"
              fontSize={{ base: "20px", md: "30px" }}
              fontWeight={700}
              color="#2E4924"
              padding="0 15px"
            >
              {data[0]?.name}
            </Text>
            <Image
              src={data[0]?.image}
              alt="dummy image"
              maxW={{ base: "100%", md: "100%" }}
              width="100%"
              height="auto"
              mt="30px"
            />
            <Box
              p={{ base: "15px", md: "0", lg: "0" }}
              fontSize={{ base: "14px", md: "20px" }}
              fontWeight={400}
              color="#2E4924"
              m="3% 0"
              dangerouslySetInnerHTML={{ __html: data[0].desc }}
            />
            <Box width="100%">
              <LineBreak />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default withRouter(DetailTechZone);
