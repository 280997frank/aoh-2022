import React, { FC, useRef, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Img,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import Slider from "react-slick";
import LineBreak from "@/components/Atoms/LineBreak";
import { actions as fullscreenAction } from "@/states/fullscreen/slice";
import { useDispatch } from "react-redux";

const JourneyOfOurNsmenContent: FC<{
  data: {
    mainTitle: string;
    title: string;
    description: {
      title: string;
      past: string;
      present: string;
    };
    imageUrl: string[];
  };
}> = ({ data }) => {
  const dispatch = useDispatch();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const SLIDER_PER_PAGE = isMobile ? 2 : 3;
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(data.imageUrl[0]);
  const slider = useRef<any>();
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: SLIDER_PER_PAGE,
    slidesToScroll: SLIDER_PER_PAGE,
    swipe: true,
    arrows: false,
    infinite: data.imageUrl.length > SLIDER_PER_PAGE,
  };

  const nextVideo = (i: number) => {
    let ind = i;
    if (i >= data.imageUrl.length) {
      ind = 0;
    }
    if (ind > 0 && ind % SLIDER_PER_PAGE === 0) {
      if (slider.current) slider.current.slickNext();
    } else {
      if (ind === 0) {
        if (slider.current) slider.current.slickGoTo(0);
      }
    }
    handleClickVideo(data.imageUrl[ind], ind);
  };

  const prevVideo = (index: number) => {
    let ind = index;
    if (index < 0) {
      ind = data.imageUrl.length - 1;
    }
    if (ind > 0 && ind % SLIDER_PER_PAGE === 0) {
      if (slider.current) slider.current.slickPrev();
    }
    handleClickVideo(data.imageUrl[ind], ind);
  };

  const handleClickVideo = (image: string, index: number) => {
    setIndex(index);
    setImage(image);
    dispatch(fullscreenAction.setStream(true));
  };

  return (
    <Flex flexDir="column" justifyContent="center">
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={{
          base: "2xl",
          lg: "2.375rem",
        }}
        color="brand.green"
        marginBottom="50px"
      >
        {data.mainTitle.toUpperCase()}
      </Text>
      <Text
        fontWeight="bold"
        color="brand.tallPoppy"
        fontSize={{
          base: "lg",
          lg: "28px",
        }}
        lineHeight={{ base: "21px", lg: "38px" }}
        marginLeft={{
          base: 4,
          md: "0px",
        }}
        marginBottom={{ base: "13px", lg: "21px" }}
      >
        {data.title.toUpperCase()}
      </Text>
      <Box position="relative">
        {data.imageUrl.length > 1 && (
          <Button
            w="45px"
            bg="transparent"
            _hover={{ backgroundColor: "none" }}
            pos="absolute"
            left={{ base: "10px", md: "-65px" }}
            top="45%"
            zIndex={20}
            onClick={() => {
              prevVideo(index - 1);
            }}
          >
            <ArrowLeftRounded w="30px" h="30px" />
          </Button>
        )}
        <AspectRatio
          ratio={16 / 9}
          marginX={{
            base: "-15px",
            md: "0",
          }}
        >
          <Img src={image} width="100%" alt={image} />
        </AspectRatio>
        {data.imageUrl.length > 1 && (
          <Button
            w="45px"
            bg="transparent"
            _hover={{ backgroundColor: "none" }}
            pos="absolute"
            right={{ base: "10px", md: "-60px", lg: "-60px" }}
            zIndex={20}
            top="45%"
            onClick={() => {
              nextVideo(index + 1);
            }}
          >
            <ArrowRightCircle w="30px" h="30px" />
          </Button>
        )}
      </Box>

      <Box paddingX={{ base: 4, md: 0 }} marginTop="33px" marginBottom={4}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", lg: "1.3125rem" }}
          lineHeight={{ base: "19px", lg: "29px" }}
          color="brand.green"
          marginBottom={5}
        >
          {data.description.title}
        </Text>
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", lg: "1.3125rem" }}
          lineHeight={{ base: "19px", lg: "29px" }}
          color="brand.green"
        >
          Past :
        </Text>
        <Text
          fontSize={{ base: "sm", lg: "1.3125rem" }}
          lineHeight={{ base: "19px", lg: "29px" }}
          color="brand.green"
          marginBottom={5}
        >
          {data.description.past}
        </Text>
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", lg: "1.3125rem" }}
          lineHeight={{ base: "19px", lg: "29px" }}
          color="brand.green"
        >
          Present :
        </Text>
        <Text
          fontSize={{ base: "sm", lg: "1.3125rem" }}
          lineHeight={{ base: "19px", lg: "29px" }}
          color="brand.green"
        >
          {data.description.present}
        </Text>
      </Box>

      <Box paddingX={{ base: 4, md: 0 }}>
        <LineBreak />
      </Box>

      <Box
        sx={{
          ".slick-slide": {
            px: "5px",
          },
          ".slick-track": {
            pl: 0,
          },
          ".slick-dots li.slick-active button:before": {
            color: "brand.tallPoppy",
          },
        }}
        marginX={{ base: "-20px", md: 0 }}
      >
        <Slider {...settings} ref={slider}>
          {data.imageUrl.length != 0 &&
            data.imageUrl.map((item, i) => {
              return (
                <Box
                  mb="5px"
                  mt="30px"
                  pos="relative"
                  key={i}
                  onClick={() => handleClickVideo(item, i)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <Img src={item} width="100%" alt={item} />
                  </AspectRatio>
                </Box>
              );
            })}
        </Slider>
      </Box>
    </Flex>
  );
};

export default JourneyOfOurNsmenContent;
