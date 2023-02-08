import React, { useCallback } from "react";
import { Box, Flex, Heading, Img } from "@chakra-ui/react";
import { ICardItem } from "@/types/cardItem";

const MAX_LENGTH = 200;

const CardItem: React.FC<ICardItem> = ({
  title,
  thumbnail,
  description,
  onClick,
}) => {
  const properDescription = useCallback((description: string) => {
    if (description.length > MAX_LENGTH) {
      return description.slice(0, MAX_LENGTH).concat(" ...");
      // return description.substring(0, description.lastIndexOf("<p>&nbsp;</p>"));
    } else {
      return description;
    }
  }, []);

  return (
    <Flex
      bg="rgba(255,254,229, .62)"
      w="fit-content"
      height="100%"
      flexDir="column"
      onClick={onClick}
      cursor="pointer"
    >
      <Img
        src={thumbnail}
        alt="dummy"
        objectFit="cover"
        width="100%"
        height="200px"
      />
      <Box p="16px" w="100%">
        {/* <Link href={url}> */}
        <Heading size="md" my="10px" color="brand.green">
          {title}
        </Heading>
        {/* </Link> */}
        <div
          dangerouslySetInnerHTML={{ __html: properDescription(description) }}
        />
      </Box>
    </Flex>
  );
};

export default CardItem;
