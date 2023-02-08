import DetailBringYourDrone from "@/components/Organisms/DetailBringYourDrone";
import Layout from "@/components/Template/Layout";
import { useBringYourOwnDrone } from "@/hooks/droneArena";
import { Box } from "@chakra-ui/react";
import React from "react";

const DetailDrone = () => {
  const { contentBringYourDrone, loading } = useBringYourOwnDrone();

  return (
    <Layout title="Bring Your Own Drone" withBackButton>
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "0", md: "50px", lg: "20%" }}
      >
        {contentBringYourDrone && (
          <DetailBringYourDrone
            title={contentBringYourDrone.title}
            images={contentBringYourDrone.images}
            desc={contentBringYourDrone.desc}
          />
        )}
      </Box>
    </Layout>
  );
};

export default DetailDrone;
