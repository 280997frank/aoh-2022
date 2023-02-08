import LineBreak from "@/components/Atoms/LineBreak";
import ContentDetail from "@/components/Molecules/ContentDetail";
import { TBringYourDrone, TDateTime } from "@/types/droneArena";
import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import isNil from "lodash/isNil";
import { useOnClickTracking } from "@/hooks/trackings";
import React, { useMemo } from "react";
import Slider from "react-slick";
interface TpropsDate {
  dateTime: TDateTime[];
}
const ContentDateTime: React.FC<TpropsDate> = ({ dateTime }) => {
  console.log("dateTime", dateTime);

  useOnClickTracking({
    isClicked: dateTime !== undefined,
    type: "hotspot",
    data: {
      slug: "/drone-arena/bring-your-own-drone",
      title: "Drone Arena Bring Your Own Drone",
    },
  });

  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
      w="auto"
      height="100%"
    >
      {dateTime.map((item, index: number) => (
        <Box
          key={index}
          width={{
            base: "100%",
            md: "33%",
          }}
          borderLeft={{
            base: "none",
            md: index > 0 ? "1px #C0BE9A solid" : "none",
          }}
          pl={{
            base: "0px",
            md: index > 0 ? "10px" : "none",
          }}
        >
          <Heading
            textTransform="uppercase"
            size="sm"
            py="1rem"
            color={"#2E4924"}
            pt="0px !important"
            pb="0px"
          >
            {item.date}
          </Heading>
          <SimpleGrid
            columns={{
              base: 3,
              md: 1,
            }}
            spacing={0}
          >
            {item.time.map((time, index: number) => (
              <Text
                key={index}
                color="#2E4924"
                borderLeft={{
                  base: index > 0 && index !== 3 ? "1px #C0BE9A solid" : "none",
                  md: "none",
                }}
                textAlign={{
                  base: index > 0 && index !== 3 ? "center" : "start",
                  md: "start",
                }}
                ml={{
                  base: index == 1 ? "-5px" : "0px",
                  md: "0px",
                }}
              >
                {time}
              </Text>
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </Stack>
  );
};
const DetailBringYourDrone: React.FC<TBringYourDrone> = ({
  title,
  desc,
  images,
}) => {
  console.log("desc", desc);
  const dataArrayImages = useMemo(
    () => [...images].sort((a, b) => a.sequence - b.sequence),
    [images]
  );

  const dataArraydesc = useMemo(
    () => [...desc].sort((a, b) => a.sequence - b.sequence),
    [desc]
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots drone-color-dots",
    adaptiveHeight: true,
  };

  return (
    <Box
      pt={{
        base: "4rem",
        md: "5rem",
      }}
      pb={{
        base: "2rem",
        md: "5rem",
      }}
    >
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        mb={{
          base: "1rem",
          md: "2rem",
        }}
      >
        <Heading fontSize={{ base: "23px", md: "30px" }} color="brand.green">
          {title}
        </Heading>
      </Flex>
      {dataArrayImages.length >= 1 && (
        <Box
          mb={{
            base: "3rem",
            md: "5rem",
          }}
        >
          <Slider {...settings}>
            {dataArrayImages.map((item) => {
              return (
                <Image
                  key={item.sequence}
                  src={item.imgUrl}
                  alt="drone arena"
                />
              );
            })}
          </Slider>
          <LineBreak />
        </Box>
      )}
      {dataArraydesc && (
        <Box
          width={{
            base: "100%",
            md: "100%",
          }}
          mr="auto"
          ml="auto"
          pl="20px"
          pr="20px"
        >
          {dataArraydesc.map((item) => {
            return (
              <>
                {!isNil(item.desc) && (
                  <>
                    <ContentDetail
                      title={item.title}
                      key={item.sequence}
                      color="#D0B200"
                    >
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: item.desc,
                        }}
                        color="brand.green"
                        mb="1rem"
                      />
                    </ContentDetail>
                    <LineBreak />
                  </>
                )}
                {!isNil(item.dateTime) && (
                  <>
                    <Heading
                      textTransform="uppercase"
                      size="md"
                      py="1rem"
                      color={"#D0B200"}
                    >
                      {item.title}
                    </Heading>
                    <ContentDateTime dateTime={item.dateTime} />
                  </>
                )}
              </>
            );
          })}
        </Box>
      )}
      <Box width="100%" height="20px" mt={16}>
        <LineBreak />
      </Box>
    </Box>
  );
};

export default DetailBringYourDrone;
