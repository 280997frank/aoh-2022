import ArrowLeftCircle from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import LineBreak from "@/components/Atoms/LineBreak";
import ContentDetail from "@/components/Molecules/ContentDetail";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Img,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDocumentData } from "react-firehooks";
import { useOnClickTracking } from "@/hooks/trackings";
import Slider from "react-slick";

interface TObstaclesCourse {
  title: string;
  description: string;
  video: {
    url: string;
    title: string;
  };
  image: {
    title: string;
    url: string[];
  };
}

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Button
      w="45px"
      bg="transparent"
      _hover={{ backgroundColor: "none" }}
      pos="absolute"
      right={{ base: "-20px", md: "-40px", lg: "-40px" }}
      zIndex={20}
      top="45%"
      onClick={onClick}
    >
      <ArrowRightCircle w="30px" h="30px" />
    </Button>
  );
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Button
      w="45px"
      bg="transparent"
      _hover={{ backgroundColor: "none" }}
      pos="absolute"
      left={{ base: "-20px", md: "-40px", lg: "-60px" }}
      top="45%"
      zIndex={20}
      onClick={onClick}
    >
      <ArrowLeftCircle w="30px" h="30px" />
    </Button>
  );
};

const ObstaclesCourse = () => {
  const slider: any = useRef(null);
  const SLIDES_PER_PAGE = 1;
  const soldierStrong = collection(
    db,
    "soldier-strong"
  ) as CollectionReference<TObstaclesCourse>;
  const [lengthData, setLengthData] = useState(0);

  const [data] = useDocumentData(doc(soldierStrong, "obstacles-course"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (data) {
      setLengthData(data.image.url.length);
    }
  }, [lengthData, data]);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: SLIDES_PER_PAGE,
    slidesToScroll: SLIDES_PER_PAGE,
    swipe: lengthData >= 1,
    arrows: lengthData >= 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  useOnClickTracking({
    isClicked: lengthData !== 0,
    type: "hotspot",
    data: {
      slug: "/soldier-strong/obstacles-course",
      title: "Soldier Strong Introduction",
    },
  });

  return (
    <Layout title="Soldier Strong Obstacles Course" withBackButton>
      <Box
        h="100%"
        w="100%"
        pos="relative"
        px={{ base: "0", md: "50px", lg: "20%" }}
      >
        <Tabs colorScheme="green">
          <TabPanels paddingTop={{ base: "40px", md: "40px" }}>
            <TabPanel>
              <Heading
                fontSize={{ base: "20px", md: "30px" }}
                color="brand.green"
                textAlign="center"
                textTransform="uppercase"
              >
                {data?.title}
              </Heading>
              <Box>
                <Box
                  sx={{
                    ".slick-dots li.slick-active button:before": {
                      color: "brand.green",
                    },
                  }}
                  w="100%"
                  marginTop="50px"
                >
                  <Slider {...settings} ref={slider}>
                    {data?.image.url.map((item, i) => {
                      return (
                        <Box
                          pr="0.5rem"
                          mb="20px"
                          mt="20px"
                          pos="relative"
                          key={i}
                          // onClick={() => handleClickVideo(item, i)}
                        >
                          <AspectRatio ratio={16 / 9}>
                            <Img src={item} width="100%" alt={item} />
                          </AspectRatio>
                        </Box>
                      );
                    })}
                  </Slider>
                </Box>
                <Box height="30px" />
                <LineBreak />
                <Box height="10px" />
                <ContentDetail title="Obstacle Details" color="brand.crete">
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: data?.description || "",
                    }}
                    sx={{
                      "& ul": {
                        paddingLeft: "2rem",
                      },
                    }}
                  />
                </ContentDetail>
                <Box width="100%">
                  <LineBreak />
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default ObstaclesCourse;
