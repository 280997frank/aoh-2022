import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import ContentDetail from "@/components/Molecules/ContentDetail";
import { AspectRatio, Box, Button, Img, Text } from "@chakra-ui/react";
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import { actions as fullscreenAction } from "@/states/fullscreen/slice";
import { useDispatch } from "react-redux";

interface CarouselShowCaseProps {
  data: [
    {
      title: string;
      description: string;
      thumbnail: string;
      url: string;
      type: string;
    }
  ];
}

const CarouselShowCase: FC<CarouselShowCaseProps> = ({ data }) => {
  const dispatch = useDispatch();

  const videoWrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const videoRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const nodeRef = useRef(null);
  const slider: any = useRef(null);

  const [index, setIndex] = useState(0);
  const [url, setVideo] = useState(data[index].url);
  const [title, setTitle] = useState(data[index].title);
  const [description, setDescription] = useState(data[index].description);
  let [type, setType] = useState(data[index].type);
  const [currentPage, setCurrentPage] = useState(0);
  const SLIDES_PER_PAGE = 3;

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
        bg={i % SLIDES_PER_PAGE === currentPage ? "#2E4924" : "#FFFEE5"}
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
    handleClickData(
      data[ind].url,
      data[ind].title,
      data[ind].type,
      data[ind].description,
      ind
    );
  };

  const prevVideo = (index: number) => {
    let ind = index;
    if (index < 0) {
      console.log("masuk sini");
      ind = data.length - 1;
    }
    if (ind > 0 && ind % SLIDES_PER_PAGE === 2) {
      if (slider.current) slider.current.slickPrev();
    }
    handleClickData(
      data[ind].url,
      data[ind].title,
      data[ind].type,
      data[ind].description,
      ind
    );
  };

  const handleClickData = (
    video: string,
    title: string,
    type: string,
    description: string,
    index: number
  ) => {
    setIndex(index);
    setVideo(video);
    setTitle(title);
    setDescription(description);
    setType(type);
    dispatch(fullscreenAction.setStream(true));
    scrollToTop();
  };

  return (
    <Box>
      <Box ref={videoWrapperRef} position="relative">
        {data.length > 1 && (
          <Button
            w="45px"
            bg="transparent"
            _hover={{ backgroundColor: "none" }}
            pos="absolute"
            left={{ base: "-40px", md: "-65px" }}
            top={
              title !== ""
                ? { base: "28%", md: "45%" }
                : { base: "60px", md: "45%" }
            }
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
          <ContentDetail title={title} color="#747e2f" isUppercase={false}>
            {type === "image" ? (
              <AspectRatio ratio={16 / 9}>
                <Img
                  __css={{
                    objectFit: "contain !important",
                  }}
                  src={url}
                  width="100%"
                  alt={url}
                />
              </AspectRatio>
            ) : (
              <AspectRatio ratio={16 / 9}>
                <video
                  ref={nodeRef}
                  controls
                  key={url}
                  width="100%"
                  controlsList="nodownload"
                >
                  <source src={`${url}#t=0.001`} />
                </video>
              </AspectRatio>
            )}
          </ContentDetail>
          <Box
            mt="30px"
            mb="20px"
            borderBottom="1px #747e2f solid"
            paddingBottom={"20px"}
          >
            <ContentDetail>
              <Text
                color="#2E4924"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </ContentDetail>
          </Box>
        </Box>
        {data.length > 1 && (
          <Button
            w="45px"
            bg="transparent"
            _hover={{ backgroundColor: "none" }}
            pos="absolute"
            right={{ base: "-40px", md: "-60px", lg: "-60px" }}
            zIndex={20}
            top={
              title !== ""
                ? { base: "28%", md: "45%" }
                : { base: "60px", md: "45%" }
            }
            onClick={() => {
              nextVideo(index + 1);
            }}
          >
            <ArrowRightCircle w="30px" h="30px" />
          </Button>
        )}
      </Box>
      <Slider {...settings} ref={slider} className="customSlider">
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
                handleClickData(
                  item.url,
                  item.title,
                  item.type,
                  item.description,
                  i
                )
              }
            >
              {item.type === "image" && (
                <AspectRatio ratio={16 / 9}>
                  <Img
                    src={item.url}
                    width="100%"
                    height={150}
                    alt={url}
                    __css={{
                      objectFit: "contain !important",
                    }}
                  />
                </AspectRatio>
              )}

              {item.type === "video" && (
                <AspectRatio ratio={16 / 9}>
                  <video style={{ width: "inherit" }} controlsList="nodownload">
                    <source src={`${item.url}#t=0.001`} type="video/mp4" />
                  </video>
                </AspectRatio>
              )}
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default CarouselShowCase;
