import React, { FC } from "react";
import { Heading } from "@chakra-ui/react";
import { TLayout } from "@/types/venueInfo";
import { Flex, Box, Image, Text } from "@chakra-ui/react";

const VenueInfoGettingHere = ({ label }: TLayout) => {
  return (
    <Box pl="25rem" pr="25rem">
      <Heading
        fontSize={{ base: "2rem", lg: "3rem" }}
        fontWeight="bold"
        // lineHeight={{ base: "2.75rem", lg: "4.125rem" }}
        color="#2E4924"
        textAlign="center"
        marginBottom={{ base: 10, lg: 10 }}
      >
        {label}
      </Heading>
      <Flex>
        <Box w="70%">
          <Image
            boxSize="100%"
            objectFit="cover"
            src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/venue%2Fmap-f1-pit-building.png?alt=media&token=8eea0b70-f46c-4599-b349-ff05f60abe28"
            alt=""
          />
        </Box>
        <Box ml="2rem" w="30%">
          <Box mt="2rem">
            <Heading as="h4" size="md">
              Venue Address
            </Heading>
            <Text>
              F1 Pit Building is located at 1 Republic Blvd, Singapore 038975
            </Text>
          </Box>
          <Box mt="1rem">
            <Heading as="h4" size="md">
              Mass Rapid Transport (MRT)
            </Heading>
            <Text>
              Promenade Station, Exit A 10-minute walk from Promenade MRT (CC4 /
              DT15)
            </Text>
          </Box>
          <Box mt="1rem">
            <Heading as="h4" size="md">
              Bus
            </Heading>
            <Text>
              The nearest bus stop is located opposite Ritz-Carlton (Bus Stop
              02171)
            </Text>
          </Box>
          <Box mt="1rem">
            <Heading as="h4" size="md">
              Car/Taxi
            </Heading>
            <Text>Via Temasek Avenue and Raffles Boulevard</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default VenueInfoGettingHere;
