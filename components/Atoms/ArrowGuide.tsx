import { FC } from "react";
import { Icon, IconProps } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ArrowGuide: FC<IconProps> = (props) => {
  return (
    <>
      <Icon
        display={{ base: "block", md: "none" }}
        as={FaChevronLeft}
        zIndex="1"
        position="absolute"
        top="50%"
        left="15px"
        transform="translate(-50%, -50%)"
        boxSize="2rem"
        color="brand.cream200"
        {...props}
      />
      <Icon
        display={{ base: "block", md: "none" }}
        as={FaChevronRight}
        zIndex="1"
        position="absolute"
        top="50%"
        right="-15px"
        transform="translate(-50%, -50%)"
        boxSize="2rem"
        color="brand.cream200"
        {...props}
      />
    </>
  );
};

export default ArrowGuide;
