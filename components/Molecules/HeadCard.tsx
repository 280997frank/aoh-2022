import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { IHeadCard } from "@/types/headCard";

const HeadCard: React.FC<IHeadCard> = ({ title, subtitle, image }) => {
  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center">
      <Heading fontSize={{ base: "20px", md: "30px" }} color="brand.green">
        {title}
      </Heading>
      <Text fontStyle="italic" mt=".8%">
        {subtitle}
      </Text>
      <Box marginY="20px">
        <Image src={image} maxH="15rem" alt="dummy image" />
      </Box>
    </Flex>
  );
};

export default HeadCard;
