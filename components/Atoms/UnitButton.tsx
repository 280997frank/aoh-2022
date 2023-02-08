import { Button, Img, Text } from "@chakra-ui/react";

import type { FC, MouseEventHandler } from "react";
import type { StaticImageData } from "next/image";

interface UnitButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  image: StaticImageData;
  name: string;
}

const UnitButton: FC<UnitButtonProps> = ({ onClick, image, name }) => (
  <Button
    h="auto"
    bgColor="transparent"
    onClick={onClick}
    _hover={{
      bgColor: "transparent",
    }}
    display="flex"
    flexDir="column"
    justifyContent="center"
  >
    <Img
      src={image.src}
      alt=""
      htmlWidth={image.width}
      htmlHeight={image.height}
      maxW={{ base: "6.25rem", lg: "unset" }}
    />
    <Text
      textTransform="uppercase"
      fontWeight="bold"
      fontSize={{ base: "md", lg: "1.5625rem" }}
      color="white"
    >
      {name}
    </Text>
  </Button>
);

export default UnitButton;
