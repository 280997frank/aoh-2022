import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Button, Text, Image, Img } from "@chakra-ui/react";
import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ICarauselItem } from "@/types/carouselItem";
import ContentDetail from "../Molecules/ContentDetail";
import { useSwipeable } from "react-swipeable";

const CarouselItem: React.FC<ICarauselItem> = ({
  data,
  type,
  showThumbnail = false,
  zoneArmy,
  onChangeIndex = () => {},
}) => {
  // const {data, title} = props
  // const [videoEleThumbnail, setVideoEleThumnail] = useState<HTMLDivElement | null>(null)
  // const [videoRef, setVideoRef] = useState<HTMLDivElement | null>(null)
  // const videoWrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  // const videoRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  // const listVideoWrapperRef: MutableRefObject<HTMLDivElement | null> =
  //   useRef(null);
  // const nodeRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [url, setVideo] = useState(data[index].url);

  const handlerSwipe = useSwipeable({
    onSwipedLeft: () => nextVideo(index + 1),
    onSwipedRight: () => prevVideo(index - 1),
  });

  const nextVideo = (i: number) => {
    let ind = i;
    if (i > data.length - 1) {
      ind = 0;
    }
    handleClickVideo(data[ind].url, ind);
  };

  const prevVideo = (i: number) => {
    let ind = i;
    if (i < 0) {
      ind = data.length - 1;
    }
    handleClickVideo(data[ind].url, ind);
  };

  const handleClickVideo = (video: string, i: number) => {
    setIndex(i);
    onChangeIndex(i);
    setVideo(video);
  };

  const scrollToSelectedList = (i: number) => {
    let elementImg = document.getElementById(`img-thumb-${i}`);
    if (elementImg) {
      elementImg.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getColorZone = (zone?: string) => {
    switch (zone) {
      case "formation":
        return "brand.green";
      case "platform":
        return "brand.jaffa";
      case "soldierstrong-intorduction":
        return "brand.crete";

      default:
        return "brand.green";
    }
  };

  // useEffect(() => {
  //   if (
  //     videoEleThumbnail &&
  //     videoRef
  //   ) {
  // console.log("video wrapper ", videoEleThumbnail.clientHeight , videoRef.style);
  // videoRef.style.height = `${videoEleThumbnail.clientHeight}px`;
  // videoEleThumbnail.style.height = `${videoEleThumbnail.clientHeight}px`;
  // listVideoWrapperRef.current.style.width = `${videoEleThumbnail.clientWidth}px`;
  // }
  // }, [videoEleThumbnail, videoRef]);
  return (
    <Box>
      <Box
        // bg="red"
        w="inherit"
        height="inherit"
        // overflow="hidden"
        // padding={{ base: "0", md: "10px 65px" }}
      >
        <Heading
          fontSize="1rem"
          color={getColorZone(zoneArmy)}
          mb="10px"
          textTransform="uppercase"
          textAlign="left"
        >
          {data[index].title}
        </Heading>

        <Box
          // ref={setVideoRef}
          position="relative"
          w="100%"
        >
          {data.length > 1 && (
            <Button
              w="45px"
              bg="transparent"
              display={{ base: "flex", md: "flex" }}
              _hover={{ backgroundColor: "none" }}
              pos="absolute"
              left={{ base: "0", md: "-50px" }}
              top="45%"
              zIndex="2"
              onClick={() => {
                prevVideo(index - 1);
              }}
            >
              <ArrowLeftRounded w="30px" h="30px" />
            </Button>
          )}
          <Box overflow="hidden" {...handlerSwipe}>
            <Box
              whiteSpace="nowrap"
              transform={`translateX(-${index * 100}%)`}
              transition="all .5s"
            >
              {data.map((item, i) => {
                return (
                  <Image
                    key={`slide-${i}`}
                    src={item.url}
                    alt={item.url}
                    w="100%"
                    display="inline-flex"
                    justifyContent="center"
                    objectFit="cover"
                    alignItems="center"
                    height="auto"
                  />
                );
              })}
            </Box>
          </Box>
          {data.length > 1 && (
            <Button
              w="45px"
              bg="transparent"
              _hover={{ backgroundColor: "none" }}
              pos="absolute"
              display={{ base: "flex", md: "flex" }}
              right={{ base: "0", lg: "-50px" }}
              top="45%"
              zIndex="2"
              onClick={() => {
                nextVideo(index + 1);
              }}
            >
              <ArrowRightCircle w="30px" h="30px" />
            </Button>
          )}
        </Box>
        {data.length > 0 && data[index].description && (
          <ContentDetail>
            <Text
              mt="5%"
              color="brand.green"
              dangerouslySetInnerHTML={{ __html: `${data[index].description}` }}
            />
          </ContentDetail>
        )}
        {showThumbnail && data.length > 1 && (
          <Box
            // ref={setVideoEleThumnail}
            w="100%"
            mt="10px"
            display={data.length > 3 ? "block" : "inline-flex"}
            overflowX="auto"
            whiteSpace="nowrap"
            __css={{
              "&::-webkit-scrollbar": {
                width: "2px",
              },
              scrollbarWidth: "thin",
            }}
          >
            {data.map((item, i) => {
              return (
                <Box
                  id={`img-thumb-${i}`}
                  pos="relative"
                  display="inline-flex"
                  width="200px"
                  mx="5px"
                  _after={
                    index !== i
                      ? {
                          content: '""',
                          backgroundColor: "#fff",
                          opacity: ".5",
                          position: "absolute",
                          zIndex: "10",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                        }
                      : {}
                  }
                  key={i}
                  flex="1"
                  onClick={() => {
                    handleClickVideo(item.url, i);
                    scrollToSelectedList(i);
                  }}
                >
                  {type === "image" ? (
                    <Image
                      src={item.url}
                      width="100%"
                      objectFit="contain"
                      alt={url}
                    />
                  ) : (
                    <video
                      key={item.url}
                      style={{ width: "inherit" }}
                      controlsList="nodownload"
                    >
                      <source src={item.url} type="video/mp4"></source>
                    </video>
                  )}
                </Box>
              );
            })}
          </Box>
        )}

        {data.length > 1 && (
          <Flex flexDir="row" justifyContent="center" gap="10px" mt="15px">
            {data.map((item, i) => {
              return (
                <Box
                  key={i}
                  onClick={() => {
                    // setVideo(data[i].url);
                    // setIndex(i);
                    handleClickVideo(item.url, i);
                    scrollToSelectedList(i);
                  }}
                  bg={index === i ? "brand.green" : "#FFFEE5"}
                  w={{ base: "2vw", md: ".8vw" }}
                  h={{ base: "2vw", md: ".8vw" }}
                  borderRadius="50%"
                  cursor="pointer"
                />
              );
            })}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default CarouselItem;
