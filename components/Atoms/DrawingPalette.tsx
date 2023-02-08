import { TDrawingPalette, TPalette } from "@/types/kids-zone";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";

const DEFAULT_PALETTE = "#ffffff";

const MobilePalette: TPalette = ({ handleColorClick, palettes }) => {
  const [isLessThen382] = useMediaQuery("(max-width: 382px)");
  const [is382until413] = useMediaQuery("(max-width: 413px)");
  const [boxSize, setBoxSize] = useState(33);
  const filteredOddPalette = palettes.filter(
    (palette) => palette.position % 2 === 0
  );
  const filteredNoneOddPalette = palettes.filter(
    (palette) => palette.position % 2 === 1
  );
  const newPalettes = [...filteredOddPalette, ...filteredNoneOddPalette];

  useEffect(() => {
    if (isLessThen382) {
      setBoxSize(25);
    } else if (is382until413) {
      setBoxSize(27);
    } else {
      setBoxSize(29);
    }
  }, [isLessThen382, is382until413]);

  return (
    <Flex padding={2} alignItems="center" justifyContent="center">
      <Flex flex="1" w="100%" flexWrap="wrap">
        {newPalettes.map((palette) => (
          <Box
            key={palette.hexcode}
            margin="2px"
            bgColor={palette.hexcode}
            height={`${boxSize}px`}
            width={`${boxSize}px`}
            borderRadius={4}
            cursor="pointer"
            onClick={() => handleColorClick(palette.hexcode)}
          />
        ))}
      </Flex>
      <Box
        width={`${boxSize * 2 + 2}px`}
        height={`${boxSize * 2 + 2}px`}
        bgColor={DEFAULT_PALETTE}
        borderRadius={4}
        cursor="pointer"
        border="1px solid black"
        onClick={() => handleColorClick(DEFAULT_PALETTE)}
      />
    </Flex>
  );
};

const DesktopPalette: TPalette = ({ handleColorClick, palettes }) => {
  return (
    <Flex w="106px" flexWrap="wrap" justifyContent="center" alignItems="center">
      {palettes.map((palette) => (
        <Box
          key={palette.hexcode}
          flex="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bgColor={palette.hexcode}
            height="40px"
            width="40px"
            borderRadius={4}
            cursor="pointer"
            onClick={() => handleColorClick(palette.hexcode)}
          />
        </Box>
      ))}
      <Flex flex="100%" justifyContent="center">
        <Box
          bgColor={DEFAULT_PALETTE}
          height="98px"
          width="98px"
          borderRadius={4}
          cursor="pointer"
          border="1px solid black"
          onClick={() => handleColorClick(DEFAULT_PALETTE)}
        />
      </Flex>
    </Flex>
  );
};

const DrawingPalette: TDrawingPalette = ({ onSelectColor, palettes }) => {
  const [selectedColor, setSelectedColor] = useState(DEFAULT_PALETTE);
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  useEffect(() => {
    onSelectColor(DEFAULT_PALETTE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {isDesktop ? (
        <DesktopPalette
          handleColorClick={handleColorClick}
          palettes={palettes}
        />
      ) : (
        <MobilePalette
          handleColorClick={handleColorClick}
          palettes={palettes}
        />
      )}
    </Fragment>
  );
};

export default DrawingPalette;
