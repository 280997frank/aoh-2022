import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import LineBreak from "@/components/Atoms/LineBreak";
import { actions as fullscreenAction } from "@/states/fullscreen/slice";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Img,
  useMediaQuery,
} from "@chakra-ui/react";
import isNil from "lodash/isNil";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
interface CarouselVideosProps {
  titleTab?: string;
  data: [
    {
      title: string;
      url: string;
      type: string;
      description: string;
    }
  ];
}

export default function SoldierPrehabCarousel({ data }: CarouselVideosProps) {
  const dispatch = useDispatch();

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const videoWrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const videoRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const listVideoWrapperRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const nodeRef = useRef(null);
  const slider: any = useRef(null);

  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [url, setVideo] = useState(data[index].url);
  const [title, setTitle] = useState(data[index].title);
  const [description, setdesc] = useState(
    !isNil(data[index].description) ? data[index].description : ""
  );
  let [type, setType] = useState(data[index].type);
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
    customPaging: (i: number) => (
      <Box
        bg={i % SLIDES_PER_PAGE === currentPage ? "brand.crete" : "#FFFEE5"}
        width={{ base: "0.8rem", lg: "0.8rem" }}
        height={{ base: "0.8rem", lg: "0.8rem" }}
        borderRadius="50%"
        cursor="pointer"
      />
    ),
    beforeChange: (current: number, next: number) =>
      setCurrentPage(next * SLIDES_PER_PAGE),
    afterChange: (current: number) => setCurrentPage(current / SLIDES_PER_PAGE),
  };

  const scrollToTop = useCallback(() => {
    const scrollButton = document.getElementById("content");
    scrollButton?.scrollIntoView();
  }, []);

  const nextVideo = (i: number) => {
    let ind = i;
    if (i >= data.length) {
      ind = 0;
    }
    if (ind > 0 && ind % SLIDES_PER_PAGE === 0) {
      if (slider.current) slider.current.slickNext();
    }
    handleClickVideo(
      data[ind].description,
      data[ind].url,
      data[ind].title,
      data[ind].type,
      ind
    );
  };

  const prevVideo = (index: number) => {
    let ind = index;
    if (index < 0) {
      ind = data.length - 1;
    }
    if (ind > 0 && ind % SLIDES_PER_PAGE === 2) {
      if (slider.current) slider.current.slickPrev();
    }
    handleClickVideo(
      data[ind].description,
      data[ind].url,
      data[ind].title,
      data[ind].type,
      ind
    );
  };

  const handleClickVideo = (
    description: string,
    video: string,
    title: string,
    type: string,
    index: number
  ) => {
    setIndex(index);
    setVideo(video);
    setTitle(title);
    setdesc(description);
    setType(type);
    setAutoplay(true);
    dispatch(fullscreenAction.setStream(true));
    scrollToTop();
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
    <Box mb="2rem">
      <Heading
        fontSize={{ base: "20px", md: "30px" }}
        color="brand.crete"
        mb={{ base: "20px", md: "30px" }}
        textTransform="uppercase"
        marginLeft={{
          base: "20px",
          lg: "0px",
        }}
      >
        {title}
      </Heading>
      <Box ref={videoWrapperRef} position="relative" width="100%">
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
          id="content"
          mb="1rem"
          ref={videoRef}
          overflow="hidden"
          w={{ base: "100%", md: "inherit" }}
        >
          {type === "image" ? (
            <Box width="100%">
              <AspectRatio ratio={16 / 9}>
                <Img src={url} width="100%" alt={url} />
              </AspectRatio>
              {!isNil(description) && description !== "" && (
                <Box
                  pr={{
                    base: "5",
                    md: "0px",
                  }}
                  pl={{
                    base: "5",
                    md: "0px",
                  }}
                >
                  <Box
                    mt="3%"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                    color="brand.green"
                  />
                  <LineBreak />
                </Box>
              )}
            </Box>
          ) : (
            <Box width="100%">
              <AspectRatio ratio={16 / 9}>
                <video
                  ref={nodeRef}
                  controls
                  controlsList="nodownload"
                  key={url}
                  width="100%"
                  autoPlay={autoplay}
                >
                  <source src={`${url}#t=0.001`} />
                </video>
              </AspectRatio>
              {!isNil(description) && description !== "" && (
                <Box
                  pr={{
                    base: "5",
                    md: "0px",
                  }}
                  pl={{
                    base: "5",
                    md: "0px",
                  }}
                >
                  <Box
                    mt="3%"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                    color="brand.green"
                  />
                  <LineBreak />
                </Box>
              )}
            </Box>
          )}
        </Box>
        {data.length > 1 && (
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
      {data.length > 1 && (
        <>
          <Slider {...settings} ref={slider} className="customSliderPrehab">
            {data.map((item, i) => {
              return (
                <Box
                  pr="0.5rem"
                  // mb={{ base: "-20px", lg: "-60px" }}
                  pos="relative"
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
                  onClick={() =>
                    handleClickVideo(
                      description,
                      item.url,
                      item.title,
                      item.type,
                      i
                    )
                  }
                >
                  {item.type === "image" && (
                    <AspectRatio ratio={16 / 9}>
                      <Img src={item.url} width="100%" alt={url} />
                    </AspectRatio>
                  )}

                  {item.type === "video" && (
                    <AspectRatio ratio={16 / 9}>
                      <video
                        style={{ width: "inherit" }}
                        controlsList="nodownload"
                      >
                        <source src={`${item.url}#t=0.001`} type="video/mp4" />
                      </video>
                    </AspectRatio>
                  )}
                </Box>
              );
            })}
          </Slider>
          <Box width="100%" height="10px">
            <LineBreak />
          </Box>
        </>
      )}
    </Box>
  );
}
