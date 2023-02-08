import VenueSlide from "@/components/Molecules/VenueSlide";
import { RootState } from "@/states/store";
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Slider from "react-slick";
import { useDocumentData } from "react-firehooks";
import { db } from "@/connections/firebase";
import { collection, CollectionReference, doc } from "firebase/firestore";
import ArrowLeftCircle from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";

const SliderRef = collection(db, "venue-info") as CollectionReference;

const snapshotListenOptions = {
  snapshotListenOptions: {
    includeMetadataChanges: true,
  },
};

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Button
      w="45px"
      bg="transparent"
      _hover={{ backgroundColor: "none" }}
      pos="absolute"
      right={{ base: "-40px", md: "-40px", lg: "-60px" }}
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
      left={{ base: "-40px", md: "-40px", lg: "-60px" }}
      top="45%"
      zIndex={20}
      onClick={onClick}
    >
      <ArrowLeftCircle w="30px" h="30px" />
    </Button>
  );
};

const SLIDER_PER_PAGE = 1;

const Venue = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: SLIDER_PER_PAGE,
    slidesToScroll: SLIDER_PER_PAGE,
    swipe: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: (i: number) => (
      <Box
        bg={i % 3 === currentPage ? "brand.orange" : "#FFFEE5"}
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
  const [sliderData] = useDocumentData(
    doc(SliderRef, "slider-info"),
    snapshotListenOptions
  );

  const { defaultSlide } = useSelector(
    (state: RootState) => ({
      defaultSlide: state.slide.defaultSlide,
    }),
    shallowEqual
  );

  const sliderRef = useRef<any>();

  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    const url = window.location.hash;
    const element = document.getElementById("venue-info") as HTMLDivElement;

    if (url === "#venue-info" && element) {
      element.scrollIntoView();
      handleOnClick(defaultSlide);
    }
  }, [defaultSlide, initialSlide]);

  const handleOnClick = (index: number) => {
    setInitialSlide(index);
    sliderRef.current && sliderRef.current.slickGoTo(index);
  };

  return (
    <Box
      // w={{ base: "80vw", md: "90vw" }}
      // h={{ base: "80vh", md: "85vh" }}
      height="auto"
      width="100%"
      // paddingTop={{ base: "0", md: "15vh" }}
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <div>
        <Slider {...settings} ref={sliderRef}>
          {sliderData?.venues &&
            sliderData.venues.map(
              (
                item: {
                  title: string;
                  description: string;
                  image: string;
                  url: string;
                  isDisabled: boolean;
                },
                index: number
              ) => <VenueSlide dataSlide={item} key={index} />
            )}
        </Slider>
      </div>
    </Box>
  );
};

export default Venue;
