import { VenuePropsData } from "@/types/venueInfo";
import { Box, Heading, Img, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

const VenueLayout: FC<{ dataVenue: VenuePropsData }> = ({ dataVenue }) => {
  return (
    <VStack
      w={{
        base: "100%",
        md: "50%",
      }}
      display="flex"
      justifyContent="center"
    >
      <Heading
        color={`brand.green`}
        fontSize="38px"
        marginBottom={8}
        marginTop={{
          base: "20px",
          md: "50px",
        }}
      >
        {dataVenue?.mainTitle[0]}
      </Heading>
      <Img src={dataVenue.layoutImage} />
      <VStack
        padding={{
          base: "36px",
          md: "20px 0 40px 0",
        }}
        marginTop="15px !important"
      >
        <Box
          borderTop="1px solid #C0BE9A"
          w={{
            base: "100%",
            md: "100%",
          }}
          marginBottom={{
            base: "20px !important",
            md: "0",
          }}
        />
        <Text
          color={`brand.orange`}
          fontWeight="bold"
          textAlign="left"
          w="100%"
          fontSize="28px"
        >
          INFORMATION
        </Text>
        <Text
          textAlign="justify"
          dangerouslySetInnerHTML={{ __html: dataVenue?.information || "" }}
        />
      </VStack>
    </VStack>
  );
};

export default VenueLayout;
