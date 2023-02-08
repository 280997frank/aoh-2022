import React, { MutableRefObject, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  Img,
  useMediaQuery,
} from "@chakra-ui/react";
import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { IBoxItem } from "@/types/sportsScience";

const SportScuence: React.FC<IBoxItem> = ({ data }) => {
  const [isMobile] = useMediaQuery("(min-width: 1200px)");
  const imageWrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const slider: any = useRef(null);
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndexImage, setCurrentIndexImage] = useState(0);
  const SLIDES_PER_PAGE = 1;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: SLIDES_PER_PAGE,
    slidesToScroll: SLIDES_PER_PAGE,
    swipe: true,
    arrows: isMobile,
    nextArrow: (
      <Button
        w="45px"
        bg="transparent"
        _hover={{ backgroundColor: "none" }}
        pos="absolute"
        right={{ base: "10px", lg: "-5px" }}
        zIndex={20}
        _active={{
          boxShadow: "none",
        }}
        top="45%"
        _before={{
          display: "none",
        }}
        _focus={{
          boxShadow: "none",
        }}
        onClick={() => {
          console.log("helo nex", index);
          // nextImage(index + 1);
        }}
      >
        <ArrowRightCircle w="30px" h="30px" />
      </Button>
    ),
    prevArrow: (
      <Button
        w="45px"
        bg="transparent"
        _hover={{ backgroundColor: "none" }}
        pos="absolute"
        left={{ base: "10px", md: "-15px" }}
        top="45%"
        zIndex={20}
        _before={{
          display: "none",
        }}
        _focus={{
          boxShadow: "none",
        }}
        onClick={() => {
          console.log("helo prev", index);
          // prevImage(index - 1);
        }}
      >
        <ArrowLeftRounded w="30px" h="30px" />
      </Button>
    ),
    beforeChange: (current: number, next: number) =>
      setCurrentPage(next * SLIDES_PER_PAGE),
    afterChange: (current: number) => setCurrentPage(current / SLIDES_PER_PAGE),
  };
  const nodeRef = useRef(null);
  return (
    <Box
      sx={{
        ".slick-dots": {
          li: {
            "button::before": {
              fontSize: 20,
            },
          },
          ".slick-active": {
            "button::before": {
              fontSize: 20,
            },
          },
        },
      }}
    >
      <Heading
        fontSize={{ base: "20px", md: "38px" }}
        mb={{ base: "20px", md: "30px" }}
        mt={{ base: "10px", md: "30px" }}
        textTransform="uppercase"
        textAlign="center"
        color="#2E4924"
      >
        SPORTS SCIENCE
      </Heading>

      <Slider {...settings} ref={slider}>
        {data &&
          data.map((item, index) => {
            if (data && data?.length !== 0) {
              return (
                <Box
                  w="inherit"
                  height="inherit"
                  overflow="hidden"
                  padding={{ base: "0", md: "10px 65px" }}
                  key={index}
                >
                  <Heading
                    fontSize={{ base: "20px", md: "28px" }}
                    mb={{ base: "15px", md: "15px" }}
                    textTransform="uppercase"
                    textAlign="left"
                    color="#747E2F"
                  >
                    {item.title}
                  </Heading>
                  <Box ref={imageWrapperRef}>
                    {item.images.map((img, i) => {
                      if (i === currentIndexImage) {
                        return (
                          <Box
                            overflow="hidden"
                            w={{ base: "100vw", md: "inherit" }}
                            key={i}
                          >
                            <TransitionGroup>
                              <CSSTransition
                                ref={nodeRef}
                                classNames="slide"
                                timeout={{ enter: 400, exit: 400 }}
                                key={item.title}
                              >
                                <Img src={img} width="100%" alt={item.title} />
                              </CSSTransition>
                            </TransitionGroup>
                          </Box>
                        );
                      }
                    })}
                    {item.images.length > 0 && (
                      <SimpleGrid columns={3} spacing={4} pt={4}>
                        {item.images.map((img, i) => {
                          return (
                            <Box
                              cursor="pointer"
                              onClick={() => setCurrentIndexImage(i)}
                              key={i}
                            >
                              <TransitionGroup>
                                <CSSTransition
                                  ref={nodeRef}
                                  classNames="slide"
                                  timeout={{ enter: 400, exit: 400 }}
                                  key={item.title}
                                >
                                  <Img
                                    src={img}
                                    width="100%"
                                    alt={item.title}
                                  />
                                </CSSTransition>
                              </TransitionGroup>
                            </Box>
                          );
                        })}
                      </SimpleGrid>
                    )}
                  </Box>
                </Box>
              );
            } else {
            }
          })}
      </Slider>
    </Box>
  );
};

export default SportScuence;
