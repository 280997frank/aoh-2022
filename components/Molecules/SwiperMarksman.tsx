import chevronBack from "@/assets/icons/chevron-back.svg";
import chevronFoward from "@/assets/icons/chevron-foward.svg";
import { useSwiperRef } from "@/hooks/useSwiperRef";
import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { Navigation, Pagination, SwiperOptions } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavigation } from "./SwiperDrawing";

interface ISwiperMarksman {
  images: string[];
}

export type TSwiperMarksman = React.FC<ISwiperMarksman>;

const SwiperMarksman: TSwiperMarksman = ({ images }) => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const [nextEl, nextElRef] = useSwiperRef<HTMLDivElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLDivElement>();

  let swiperOptions: SwiperOptions = {
    modules: [Pagination, Navigation],
    pagination: {
      clickable: true,
    },
    navigation: {
      prevEl,
      nextEl,
    },
  };

  if (!isDesktop) {
    swiperOptions = {
      modules: [Pagination],
      pagination: {
        clickable: true,
      },
    };
  }

  return (
    <Box backgroundColor="transparent" width="100%" position="relative">
      {isDesktop && (
        <SwiperNavigation
          img={chevronBack.src}
          isLeft
          swiperRef={prevElRef}
          pos={isDesktop ? "-40px" : "0"}
          fromTop="40%"
        />
      )}
      <Swiper className="swiper-container" {...swiperOptions}>
        {images.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              height: isDesktop ? "610px" : "270px",
            }}
          >
            <Flex justifyContent="center" alignItems="center" padding={1}>
              <Image
                src={slide}
                alt="marksman"
                width="100%"
                height="100%"
                cursor="pointer"
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
      {isDesktop && (
        <SwiperNavigation
          img={chevronFoward.src}
          isLeft={false}
          swiperRef={nextElRef}
          pos={isDesktop ? "-40px" : "0"}
          fromTop="40%"
        />
      )}
    </Box>
  );
};

export default SwiperMarksman;
