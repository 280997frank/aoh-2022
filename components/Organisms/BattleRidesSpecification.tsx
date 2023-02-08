import LineBreak from "@/components/Atoms/LineBreak";
import ContentDetail from "@/components/Molecules/ContentDetail";
import CarauselItem from "@/components/Organisms/CarouselItem";
import { IDetailBattleRides } from "@/types/battleRides";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface IDetailSpecification {
  data: IDetailBattleRides;
  loading: boolean;
}

const BattleRidesSpecification: React.FC<IDetailSpecification> = ({
  data,
  loading,
}) => {
  const { name, specification } = data;
  const imagesUrl = specification.images.map((item) => ({ url: item }));
  return (
    <Box
      h="100%"
      w="100%"
      pos="relative"
      // paddingX={{ base: "0", md: "50px", lg: "100px" }}
    >
      <Heading
        fontSize={{ base: "20px", md: "30px" }}
        color="#007761"
        my={{ base: "10px", md: "10px" }}
        textTransform="uppercase"
        textAlign="center"
      >
        {name}
      </Heading>
      <Skeleton isLoaded={!loading}>
        <CarauselItem type="image" data={imagesUrl} />
      </Skeleton>
      <Box paddingX={{ base: "1rem", md: "0" }}>
        <LineBreak />
        <ContentDetail>
          <Heading
            textTransform="uppercase"
            color="brand.chetwodeBlue"
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            my={{ base: "20px", md: "30px" }}
            textAlign="left"
          >
            specifications
          </Heading>
          <Flex
            w="100%"
            flexDir={{ base: "column", md: "row" }}
            justifyContent="space-between"
            marginBottom="20px"
          >
            <VStack alignItems="left" textAlign="left">
              <Text fontWeight="bold" color="brand.green">
                Weight
              </Text>
              <Text fontWeight="thin" color="brand.green" lineHeight="2px">
                {specification.weight}
              </Text>
            </VStack>
            <VStack
              alignItems="left"
              borderInlineStart={{ base: "none", md: "1px solid #C0BE9A" }}
              mt={{ base: "15px", md: "0" }}
              pl={{ base: "0", md: "10px" }}
              pb="6px"
              height="auto"
              textAlign="left"
            >
              <HStack>
                <Text fontWeight="bold" color="brand.green">
                  Dimension
                </Text>
                <Text fontWeight="thin" color="brand.green">
                  (Length)
                </Text>
              </HStack>
              <Text fontWeight="thin" color="brand.green" lineHeight="2px">
                {specification.dimension}
              </Text>
            </VStack>
            <VStack
              alignItems="left"
              borderInlineStart={{ base: "none", md: "1px solid #C0BE9A" }}
              mt={{ base: "15px", md: "0" }}
              pl={{ base: "0", md: "10px" }}
              pb="6px"
              height="auto"
              textAlign="left"
            >
              <Text
                fontWeight="bold"
                color="brand.green"
                textTransform="capitalize"
              >
                {specification.capacity.type} Capacity
              </Text>
              <Text fontWeight="thin" color="brand.green" lineHeight="2px">
                {specification.capacity.value}
              </Text>
            </VStack>
            {specification.others && (
              <VStack
                alignItems="left"
                borderInlineStart={{ base: "none", md: "1px solid #C0BE9A" }}
                mt={{ base: "15px", md: "0" }}
                pl={{ base: "0", md: "10px" }}
                pb="6px"
                height="auto"
                textAlign="left"
              >
                <Text fontWeight="bold" color="brand.green">
                  Others
                </Text>
                <Text fontWeight="thin" color="brand.green" lineHeight="2px">
                  {specification.others}
                </Text>
              </VStack>
            )}
          </Flex>
        </ContentDetail>
        <Box width="100%">
          <LineBreak />
        </Box>
      </Box>
    </Box>
  );
};

export default BattleRidesSpecification;
