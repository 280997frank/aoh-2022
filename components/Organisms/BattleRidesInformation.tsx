import LineBreak from "@/components/Atoms/LineBreak";
import ContentDetail from "@/components/Molecules/ContentDetail";
import CarauselItem from "@/components/Organisms/CarouselItem";
import { IDetailBattleRides } from "@/types/battleRides";
import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface IDetailEquipment {
  data: IDetailBattleRides;
  loading: boolean;
}

const BattleRidesInformation: React.FC<IDetailEquipment> = ({
  data,
  loading,
}) => {
  const { name, information } = data;
  const imagesUrl = information.images.map((item) => ({ url: item }));
  return (
    <Box
      h="100%"
      w="100%"
      pos="relative"
      paddingX={{ base: "10px", xl: "0px" }}
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
      {/* <Skeleton isLoaded={!loading}> */}
      <CarauselItem type="image" data={imagesUrl} />
      {/* </Skeleton> */}
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
            Information
          </Heading>
          <Text
            align="left"
            color="brand.green"
            dangerouslySetInnerHTML={{
              __html: information.description,
            }}
            sx={{
              "& ul": {
                paddingLeft: "2rem",
              },
            }}
          />
        </ContentDetail>
        {information.key_feature && (
          <>
            <LineBreak />
            <ContentDetail>
              <Heading
                textTransform="uppercase"
                color="brand.chetwodeBlue"
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                my={{ base: "20px", md: "30px" }}
                textAlign="left"
              >
                Key Features
              </Heading>
              <Text
                align="left"
                color="brand.green"
                dangerouslySetInnerHTML={{
                  __html: information.key_feature,
                }}
                sx={{
                  "& ul": {
                    paddingLeft: "2rem",
                  },
                }}
              />
            </ContentDetail>
          </>
        )}
        {information.others && (
          <>
            <LineBreak />
            <ContentDetail>
              <Heading
                textTransform="uppercase"
                color="brand.chetwodeBlue"
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                my={{ base: "20px", md: "30px" }}
                textAlign="left"
              >
                Others
              </Heading>
              <Text
                align="left"
                color="brand.green"
                dangerouslySetInnerHTML={{
                  __html: information.others,
                }}
                sx={{
                  "& ul": {
                    listStylePosition: "inside",
                  },
                }}
              />
            </ContentDetail>
          </>
        )}
        <Box width="100%">
          <LineBreak />
        </Box>
      </Box>
    </Box>
  );
};

export default BattleRidesInformation;
