import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import CarauselItem from "@/components/Organisms/CarouselItem";
import { IIntroductionItem } from "@/types/introduction";

interface IISPPProps {
  data: IIntroductionItem[];
}

const ISPPContent: React.FC<IISPPProps> = ({ data }) => {
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
      {/* <Heading
        fontSize={{ base: "19px", md: "25px" }}
        color="brand.green"
        my={{ base: "15px", md: "20px" }}
        textTransform="uppercase"
        textAlign="center"
      >
        Integrated Soldier Performance Programme (ISPP)
      </Heading> */}
      <CarauselItem
        type="image"
        zoneArmy="soldierstrong-intorduction"
        showThumbnail={carouselData.length > 1}
        data={carouselData}
      />
    </Box>
  );
};

export default ISPPContent;
