import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { useEffect, useRef } from "react";

import ArrowLeftRounded from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";

export interface ICaptureYourNSMomentsAboutProps {
  description: string;
  images: string[];
  title: string;
}

export interface ICaptureYourNSMomentsAbout {
  data: ICaptureYourNSMomentsAboutProps;
  goToForm: () => void;
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <Button
      w="45px"
      bg="transparent"
      _hover={{ backgroundColor: "none" }}
      _focus={{ border: "none" }}
      pos="absolute"
      right={{ base: "10px", lg: "-60px" }}
      zIndex={20}
      top="45%"
      onClick={onClick}
    >
      <ArrowRightCircle w="30px" h="30px" />
    </Button>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <Button
      w="45px"
      bg="transparent"
      _hover={{ backgroundColor: "none" }}
      _focus={{ border: "none" }}
      pos="absolute"
      left={{ base: "10px", md: "-65px" }}
      top="45%"
      zIndex={20}
      onClick={onClick}
    >
      <ArrowLeftRounded w="30px" h="30px" />
    </Button>
  );
}

export default function About({ data, goToForm }: ICaptureYourNSMomentsAbout) {
  const slider: any = useRef(null);

  useEffect(() => {
    if (data) {
      const link = document.getElementById("openNSStoriesForm");
      link?.addEventListener("click", function (e) {
        e.preventDefault();
        goToForm();
      });
    }
  }, [data, goToForm]);

  return (
    <Box mb="2rem">
      <Heading
        color="brand.green"
        mb="3rem"
        textAlign="center"
        textTransform="uppercase"
      >
        {data.title}
      </Heading>
      <Box px={{ base: "0", lg: "10%" }} mb="2rem">
        <Slider {...settings} ref={slider} className="customSlider">
          {data.images.map((item, i) => {
            return <Image key={i} src={item} alt="" />;
          })}
        </Slider>
      </Box>

      <Text
        className="customLink"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </Box>
  );
}
