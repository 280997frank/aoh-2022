import React from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import ContentDetail from "@/components/Molecules/ContentDetail";
import LineBreak from "@/components/Atoms/LineBreak";
import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import { ICardItem } from "@/types/cardItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface IDetailEquipment {
  data: ICardItem[];
  index: number;
  onChange: (index: number) => void;
}

const DetailEquipment: React.FC<IDetailEquipment> = ({
  data,
  index,
  onChange,
}) => {
  return (
    <Box h="100%" w="100%" pos="relative">
      <Heading
        fontSize={{ base: "20px", md: "30px" }}
        color="#007761"
        my={{ base: "10px", md: "10px" }}
        textTransform="uppercase"
        textAlign="center"
      >
        {data[index].title}
      </Heading>

      <Box position="relative">
        {index > 0 && (
          <Button
            w="45px"
            bg="transparent"
            _hover={{ backgroundColor: "none" }}
            pos="absolute"
            left={{ base: "10px", md: "-65px" }}
            top="50%"
            onClick={() => {
              onChange(index - 1);
            }}
          >
            <ArrowLeftRounded w="30px" h="30px" />
          </Button>
        )}

        <Box overflow="hidden" w="inherit">
          <TransitionGroup>
            <CSSTransition
              classNames="slide"
              timeout={{ enter: 400, exit: 400 }}
              key={data[index].images[0]}
            >
              <Image
                width="auto"
                maxH="500px"
                m="0 auto"
                src={data[index].images[0]}
                alt={data[index].images[0]}
              />
            </CSSTransition>
          </TransitionGroup>
        </Box>
        {index < data.length - 1 && (
          <Button
            w="45px"
            bg="transparent"
            _hover={{ backgroundColor: "none" }}
            pos="absolute"
            right={{ base: "10px", lg: "-65px" }}
            top="50%"
            onClick={() => {
              onChange(index + 1);
            }}
          >
            <ArrowRightCircle w="30px" h="30px" />
          </Button>
        )}
      </Box>
      <Flex flexDir="row" justifyContent="center" gap="10px" mt="15px">
        {data.map((item, i) => {
          return (
            <Box
              key={i}
              onClick={() => {
                onChange(i);
              }}
              bg={index === i ? "brand.green" : "#FFFEE5"}
              w=".8vw"
              h=".8vw"
              borderRadius="50%"
              cursor="pointer"
            />
          );
        })}
      </Flex>
      <LineBreak />
      <ContentDetail>
        <Text dangerouslySetInnerHTML={{ __html: data[index].description }} />
      </ContentDetail>
      <LineBreak />
    </Box>
  );
};

export default DetailEquipment;
