import chevronBack from "@/assets/icons/chevron-back.svg";
import chevronFoward from "@/assets/icons/chevron-foward.svg";
import { useSwiperRef } from "@/hooks/useSwiperRef";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Navigation, Pagination, SwiperOptions } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavigation } from "./SwiperDrawing";

interface ISwiperPhotobooth {
  avatars: string[];
  onClick: (index: number) => void;
}

export type TSwiperPhotobooth = React.FC<ISwiperPhotobooth>;

const SwiperPhotobooth: TSwiperPhotobooth = ({ avatars, onClick }) => {
  const [nextEl, nextElRef] = useSwiperRef<HTMLDivElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLDivElement>();

  let swiperOptions: SwiperOptions = {
    slidesPerView: 3,
    modules: [Pagination, Navigation],
    pagination: {
      clickable: true,
    },
    navigation: {
      prevEl,
      nextEl,
    },
  };

  return (
    <Box position="relative">
      {avatars.length > 3 && (
        <SwiperNavigation
          img={chevronBack.src}
          isLeft
          swiperRef={prevElRef}
          pos={"-30px"}
          fromTop="40%"
          width="30px"
        />
      )}
      <Swiper className="swiper-container" {...swiperOptions}>
        {avatars.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
              paddingBottom: "40px",
            }}
            onClick={() => {
              onClick(index);
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
      {avatars.length > 3 && (
        <SwiperNavigation
          img={chevronFoward.src}
          isLeft={false}
          swiperRef={nextElRef}
          pos="-30px"
          fromTop="40%"
          width="30px"
        />
      )}
    </Box>
  );
};

export default SwiperPhotobooth;
