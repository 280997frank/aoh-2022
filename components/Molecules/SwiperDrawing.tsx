import chevronBack from "@/assets/icons/chevron-back.svg";
import chevronFoward from "@/assets/icons/chevron-foward.svg";
import { useSwiperRef } from "@/hooks/useSwiperRef";
import { TSwiperNavigation, TSwipers } from "@/types/kids-zone";
import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { Navigation, Pagination, SwiperOptions } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

export const SwiperNavigation: TSwiperNavigation = ({
  swiperRef,
  img,
  isLeft,
  pos,
  fromTop,
  width = "auto",
}) => {
  return (
    <Box
      position="absolute"
      top={fromTop}
      left={isLeft ? pos : undefined}
      right={!isLeft ? pos : undefined}
      zIndex={90}
      ref={swiperRef}
      cursor="pointer"
      width={width}
    >
      <Image src={img} alt="back" />
    </Box>
  );
};

const SwiperDrawing: TSwipers = ({
  images,
  onClick,
  slidesPerView,
  selectedIndex,
}) => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const [isLessThen382] = useMediaQuery("(max-width: 382px)");
  const [is382until414] = useMediaQuery("(max-width: 414px)");
  const [nextEl, nextElRef] = useSwiperRef<HTMLDivElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLDivElement>();
  const [boxSize, setBoxSize] = useState("");

  let swiperOptions: SwiperOptions = {
    modules: [Pagination, Navigation],
    pagination: {
      clickable: true,
    },
    spaceBetween: 16,
    slidesPerView,
    navigation: {
      prevEl,
      nextEl,
    },
  };

  if (!isDesktop) {
    swiperOptions = {
      modules: [Navigation],
      spaceBetween: 16,
      slidesPerView: 4,
      navigation: {
        prevEl,
        nextEl,
      },
    };
  }

  useEffect(() => {
    if (isLessThen382) {
      setBoxSize("90px");
    } else if (is382until414) {
      setBoxSize("92px");
    } else {
      setBoxSize("102px");
    }
  }, [isLessThen382, is382until414]);

  return (
    <Box position="relative">
      <SwiperNavigation
        img={chevronBack.src}
        isLeft
        swiperRef={prevElRef}
        pos={isDesktop ? "-20px" : "8px"}
        fromTop={isDesktop ? "25%" : "30%"}
        width={isDesktop ? "28px" : "22px"}
      />
      <Swiper className="swiper-drawing" {...swiperOptions}>
        {images.map((slide, index) => (
          <SwiperSlide
            key={index}
            onClick={() => onClick(index)}
            style={{
              height: isDesktop ? "160px" : "100%",
              opacity: index === selectedIndex ? 1 : 1,
            }}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              height={{
                base: "50px",
                md: "101px",
              }}
              width={{
                base: boxSize,
                md: "180px",
              }}
              padding={1}
              bgColor="white"
              cursor="pointer"
            >
              <ReactSVG
                src={slide}
                alt={`slide-${index}`}
                id={"drawing-slider"}
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperNavigation
        img={chevronFoward.src}
        isLeft={false}
        swiperRef={nextElRef}
        pos={isDesktop ? "-20px" : "8px"}
        fromTop={isDesktop ? "25%" : "30%"}
        width={isDesktop ? "28px" : "22px"}
      />
    </Box>
  );
};

export default SwiperDrawing;
