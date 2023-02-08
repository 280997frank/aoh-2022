import { Box } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { CarouselContext } from "pure-react-carousel";

import type { FC } from "react";
import type { DotGroupProps } from "pure-react-carousel";

const CarouselGroupDot: FC<DotGroupProps> = ({
  currentSlide,
  totalSlides,
  visibleSlides,
}) => {
  const carouselContext = useContext(CarouselContext);
  const [groupIndex, setGroupIndex] = useState(0);
  const groupQty = Math.ceil((totalSlides || 0) / (visibleSlides || 1));

  useEffect(() => {
    if (
      currentSlide !== undefined &&
      totalSlides !== undefined &&
      visibleSlides !== undefined
    ) {
      const groupQty_ = Math.ceil(totalSlides / visibleSlides);

      if (visibleSlides === 1) {
        setGroupIndex(currentSlide);
      } else {
        setGroupIndex(Math.floor(currentSlide / groupQty_));
      }
    }
  }, [currentSlide, totalSlides, visibleSlides]);

  return (
    <>
      {Array.from({ length: groupQty }, (_, i) => i).map((i, _, array) => {
        if (array.length === 1) {
          // return null;
        }

        return (
          <Box
            key={i}
            className="unique-dot"
            h="0.5rem"
            w="0.5rem"
            bgColor={i === groupIndex ? "brand.orange" : "white"}
            borderRadius="50%"
            d="inline-block"
            mr={2}
            cursor="pointer"
            sx={{
              "&.unique-dot:last-child": {
                marginRight: 0,
              },
            }}
            onClick={() => {
              if (visibleSlides === 1) {
                carouselContext.setStoreState({ currentSlide: i });
              } else {
                carouselContext.setStoreState({
                  currentSlide: i * groupQty + 1,
                });
              }
            }}
          />
        );
      })}
    </>
  );
};

export default CarouselGroupDot;
