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
import { PillarOfStrengthProps } from "@/types/pillarOfStrength";
import LineBreak from "@/components/Atoms/LineBreak";

const PillarOfStrengthContentDetail: FC<{ data: PillarOfStrengthProps }> = ({
  data,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const SLIDER_PER_PAGE = isMobile ? 2 : 3;
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(data.imageUrl[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const slider = useRef<any>();
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: SLIDER_PER_PAGE,
    slidesToScroll: SLIDER_PER_PAGE,
    swipe: true,
    arrows: false,
    infinite: data.imageUrl.length > SLIDER_PER_PAGE,
    customPaging: (i: number) => (
      <Box
        bg={i % SLIDER_PER_PAGE === currentPage ? "#B5242D" : "#FFFEE5"}
        width={{ base: "0.5rem", lg: "0.5rem" }}
        height={{ base: "0.5rem", lg: "0.5rem" }}
        borderRadius="50%"
        cursor="pointer"
      />
    ),
    beforeChange: (current: number, next: number) =>
      setCurrentPage(next * SLIDER_PER_PAGE),
    afterChange: (current: number) => setCurrentPage(current / SLIDER_PER_PAGE),
  };

  const nextVideo = (i: number) => {
    let ind = i;
    if (i >= data.imageUrl.length) {
      ind = 0;
    }
    if (ind > 0 && ind % SLIDER_PER_PAGE === 0) {
      if (slider.current) slider.current.slickNext();
    }
    handleClickVideo(data.imageUrl[ind], ind);
  };

  const prevVideo = (index: number) => {
    let ind = index;
    if (index < 0) {
      ind = data.imageUrl.length - 1;
    }
    if (ind > 0 && ind % SLIDER_PER_PAGE === 2) {
      if (slider.current) slider.current.slickPrev();
    }
    handleClickVideo(data.imageUrl[ind], ind);
  };

  const handleClickVideo = (image: string, index: number) => {
    setIndex(index);
    setImage(image);
  };

  return (
    <Flex flexDir="column" justifyContent="center">
      <Text
        textAlign="center"
        fontSize={{
          base: "2xl",
          lg: "4xl",
        }}
        color="brand.green"
        fontWeight="bold"
        marginBottom="50px"
      >
        {data.mainTitle.toUpperCase()}
      </Text>
      <Text
        color="#B5242D"
        fontWeight="bold"
        marginLeft={{
          base: "20px",
          lg: "0px",
        }}
        fontSize={{
          base: "18px",
          lg: "28px",
        }}
        marginBottom="20px"
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
      <Box
        paddingX="10px"
        marginY={{
          base: "20px",
          lg: "30px",
        }}
      >
        <Text
          color="brand.green"
          dangerouslySetInnerHTML={{
            __html: data.description,
          }}
        />
      </Box>

      {data.imageUrl.length > 1 && (
        <>
          <LineBreak />
          <Slider {...settings} ref={slider} className="customSlider">
            {data.imageUrl.length != 0 &&
              data.imageUrl.map((item, i) => {
                return (
                  <Box
                    pr="0.5rem"
                    mb="20px"
                    mt="20px"
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
        </>
      )}
    </Flex>
  );
};

export default PillarOfStrengthContentDetail;
