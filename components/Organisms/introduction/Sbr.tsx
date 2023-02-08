import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

import CarauselItem from "@/components/Organisms/CarouselItem";
import { IIntroductionItem } from "@/types/introduction";

interface ISBRProps {
  data: IIntroductionItem[];
}

const SBRContent: React.FC<ISBRProps> = ({ data }) => {
  const carouselData = data.map((item: IIntroductionItem) => ({
    ...item,
    url: item.image,
  }));
  return (
    <Box
      h="100%"
      w="100%"
      pos="relative"
      // paddingX={{ base: "0", md: "50px", lg: "100px" }}
    >
      <CarauselItem
        type="image"
        zoneArmy="soldierstrong-intorduction"
        showThumbnail={carouselData.length > 1}
        data={carouselData}
      />
    </Box>
  );
};

export default SBRContent;
