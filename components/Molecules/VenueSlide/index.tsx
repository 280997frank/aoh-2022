import React, { FC } from "react";
import { Box, Button, Heading, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TSlide } from "@/types/venue";
import { useMediaQuery } from "@chakra-ui/react";

const VenueSlide: FC<{ dataSlide: TSlide }> = ({ dataSlide }) => {
  const { push } = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box w={"100%"} h="100%">
      {isMobile ? (
        <Box w="100%" h="100%" display="flex" flexDir="column">
          <Heading
            as="h1"
            fontSize={40}
            color={dataSlide.isDisabled ? "grey" : `brand.orange`}
            textAlign="center"
          >
            {dataSlide.title}
          </Heading>
          <Img
            src={dataSlide.image}
            w="100%"
            h="auto"
            maxHeight="-webkit-fill-available"
            filter={dataSlide.isDisabled ? "grayscale(40%)" : "none"}
          />
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            flexDir="column"
            alignItems="center"
          >
            <Text
              color={dataSlide.isDisabled ? "grey" : "#2E4924"}
              margin={"20px 30px"}
            >
              {dataSlide.description}
            </Text>
            <Button
              backgroundColor={`brand.orange`}
              colorScheme="#F65438"
              bgColor="#F65438"
              borderRadius="full"
              fontWeight="bold"
              w="50%"
              color="#fff"
              onClick={() => push(`/venue-info/${dataSlide.url}`)}
              marginBottom="20px"
              disabled={dataSlide.isDisabled}
            >
              FIND OUT MORE
            </Button>
          </Box>
        </Box>
      ) : (
        <Box w="100%" h="100%" display="flex" flexDir="row">
          <Img
            src={dataSlide.image}
            w="60%"
            h="auto"
            maxHeight="-webkit-fill-available"
          />
          <Box w="40%" display="flex" justifyContent="center" flexDir="column">
            <Heading as="h1" fontSize={40} color={`brand.orange`}>
              {dataSlide.title}
            </Heading>
            <Text color="#2E4924" margin={"20px 0"}>
              {dataSlide.description}
            </Text>
            <Button
              backgroundColor={`brand.orange`}
              colorScheme="#F65438"
              bgColor="#F65438"
              borderRadius="full"
              fontWeight="bold"
              w="50%"
              color="#fff"
              onClick={() => push(`/venue-info/${dataSlide.url}`)}
            >
              FIND OUT MORE
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VenueSlide;
