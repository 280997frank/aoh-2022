import { VenuePropsData } from "@/types/venueInfo";
import {
  Box,
  Heading,
  useMediaQuery,
  Img,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";

const VenueInfo: FC<{ dataVenue: VenuePropsData }> = ({ dataVenue }) => {
  const [isMobile] = useMediaQuery("(min-width: 1200px)");
  return (
    <VStack
      w={{
        base: "100%",
        md: "100%",
        lg: "70%",
      }}
      justifyContent="center"
      display="flex"
      paddingBottom={20}
    >
      <Heading
        color={`brand.green`}
        marginBottom={8}
        marginTop={{
          base: "20px",
          md: "50px",
        }}
      >
        {dataVenue?.mainTitle[1]}
      </Heading>
      <Box
        w="100%"
        display="flex"
        flexDir={{
          base: "column",
          md: "column",
          lg: "column",
          xl: "row",
        }}
      >
        <Box
          w={{
            base: "100%",
            md: "100%",
            lg: "100%",
            xl: "60%",
          }}
          paddingLeft={{
            base: "none",
            xl: "150px",
          }}
        >
          <Img
            src={dataVenue.mapImage}
            // h={{
            //   base: "100%",
            //   md: "100%",
            // }}
          />
        </Box>
        <VStack
          w={{
            base: "100%",
            md: "80%",
            xl: "60%",
          }}
          alignItems="baseline"
          marginTop={{
            base: "1px !important",
            md: "0",
          }}
          padding={{
            base: "36px",
            md: "0 0 0 25px",
          }}
          justifyContent="flex-start"
        >
          {!isMobile && (
            <Box
              borderTop={{
                base: "1px solid #C0BE9A",
                md: "none",
              }}
              w={{
                base: "100%",
                md: "40%",
              }}
              marginBottom={{
                base: "20px !important",
                md: "0",
              }}
            />
          )}

          <Box color="brand.green">
            <Text fontWeight="bold">Venue Address</Text>
            <Text
              fontWeight={{
                base: "none",
                lg: "bold",
              }}
              dangerouslySetInnerHTML={{ __html: dataVenue?.address || "" }}
            />
          </Box>
          <Box color="brand.green" pt="2">
            <Text fontWeight="bold">By MRT</Text>
            <Text
              fontWeight={{
                base: "none",
                lg: "bold",
              }}
              dangerouslySetInnerHTML={{ __html: dataVenue?.mrt || "" }}
            />
          </Box>
          <Box color="brand.green" pt="2">
            <Text fontWeight="bold">By Bus</Text>
            <Text
              fontWeight={{
                base: "none",
                lg: "bold",
              }}
              dangerouslySetInnerHTML={{ __html: dataVenue?.bus || "" }}
            />
          </Box>
          <Box color="brand.green" pt="2">
            <Text fontWeight="bold">By Car/Taxi</Text>
            <Text
              fontWeight={{
                base: "none",
                lg: "bold",
              }}
              dangerouslySetInnerHTML={{ __html: dataVenue?.car || "" }}
            />
          </Box>
          <Box color="brand.green">
            <Text fontWeight="bold">By Foot</Text>
            <Text
              fontWeight={{
                base: "none",
                lg: "bold",
              }}
              dangerouslySetInnerHTML={{ __html: dataVenue?.foot || "" }}
            />
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default VenueInfo;
