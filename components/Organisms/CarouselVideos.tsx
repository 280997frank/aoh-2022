import Slider from "react-slick";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import { actions as fullscreenAction } from "@/states/fullscreen/slice";

import { useDispatch } from "react-redux";

interface CarouselVideosProps {
  type: string;
  data: {
    url: string;
    title?: string;
  }[];
  nodeRef?: any;
}

export default function CarouselVideos({
  type,
  data,
  nodeRef,
}: CarouselVideosProps) {
  const dispatch = useDispatch();

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const videoWrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const videoRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const listVideoWrapperRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const slider: any = useRef(null);

  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [url, setVideo] = useState(data[index].url);
  const [currentPage, setCurrentPage] = useState(0);
  const SLIDES_PER_PAGE = isMobile ? 2 : 3;
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: SLIDES_PER_PAGE,
    slidesToScroll: SLIDES_PER_PAGE,
    swipe: false,
    arrows: false,
    infinite: data.length >= SLIDES_PER_PAGE,
  };

  const nextVideo = (i: number) => {
    let ind = i;
    if (i > data.length - 1) {
      ind = 0;
    }
    if (ind > 0 && ind % SLIDES_PER_PAGE === 0) {
      if (slider.current) slider.current.slickNext();
    }
    handleClickVideo(data[ind].url, ind);
  };

  const prevVideo = (i: number) => {
    let ind = i;
    if (i < 0) {
      ind = data.length - 1;
    }
    if (ind > 0 && ind % SLIDES_PER_PAGE === 2) {
      if (slider.current) slider.current.slickPrev();
    }
    handleClickVideo(data[ind].url, ind);
  };

  const handleClickVideo = (video: string, i: number) => {
    setIndex(i);
    setVideo(video);
    setAutoplay(true);
    dispatch(fullscreenAction.setStream(true));
  };

  useEffect(() => {
    if (
      videoWrapperRef &&
      videoWrapperRef.current &&
      listVideoWrapperRef &&
      listVideoWrapperRef.current &&
      videoRef &&
      videoRef.current
    ) {
      videoRef.current.style.height = `${videoWrapperRef.current.clientHeight}px`;
      videoWrapperRef.current.style.height = `${videoWrapperRef.current.clientHeight}px`;
      listVideoWrapperRef.current.style.width = `${videoWrapperRef.current.clientWidth}px`;
    }
  }, []);

  return (
    <Box mb="5rem">
      <Heading
        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
        color="#007761"
        mb={{ base: "20px", md: "30px" }}
        textTransform="uppercase"
      >
        {data[index].title}
      </Heading>
      <Box ref={videoWrapperRef} position="relative">
        {data.length > 1 && (
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
        <Box
          mb="1rem"
          ref={videoRef}
          overflow="hidden"
          w={{ base: "100%", md: "inherit" }}
        >
          <video
            ref={nodeRef}
            controls
            key={url}
            width="100%"
            autoPlay={autoplay}
            controlsList="nodownload"
            playsInline={isMobile ? false : true}
          >
            <source src={`${url}#t=0.001`} />
          </video>
        </Box>
        {data.length > 1 && (
          <Button
            w="45px"
            bg="transparent"
            _hover={{ backgroundColor: "none" }}
            pos="absolute"
            right={{ base: "10px", lg: "-60px" }}
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
      {data.length > 1 && (
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
            ".slick-dots li.slick-active button:before": {
              color: "#ED703E",
            },
          }}
        >
          <Slider {...settings} ref={slider} className="customSlider">
            {data.map((item, i) => {
              return (
                <Box
                  pr="0.3rem"
                  pl="0.1rem"
                  mb={{ base: "20px", lg: "10px" }}
                  pos="relative"
                  cursor="pointer"
                  _after={
                    index !== i
                      ? {
                          content: '""',
                          backgroundColor: "#e7e6d0",
                          opacity: ".5",
                          position: "absolute",
                          zIndex: "10",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                          padding: "0.5rem",
                        }
                      : {}
                  }
                  key={i}
                  onClick={() => handleClickVideo(item.url, i)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <video style={{ width: "inherit" }}>
                      <source src={`${item.url}#t=0.001`} type="video/mp4" />
                    </video>
                  </AspectRatio>
                </Box>
              );
            })}
          </Slider>
        </Box>
      )}
    </Box>
  );
}
