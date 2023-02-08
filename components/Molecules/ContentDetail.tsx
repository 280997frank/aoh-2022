import { Flex, Heading } from "@chakra-ui/react";

import type { FC } from "react";
import type { IContentDetail } from "@/types/contentDetail";

const ContentDetail: FC<IContentDetail> = ({
  title,
  color,
  children,
  isUppercase = true,
}) => {
  return (
    <Flex
      flexDir="column"
      position="relative"
      justifyContent="center"
      paddingX={{ base: "10px", xl: "0px" }}
    >
      {title && (
        <Heading
          textTransform={isUppercase ? "uppercase" : "none"}
          color={color || "brand.tropicalRainForest"}
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          my={{ base: "20px", md: "30px" }}
        >
          {title}
        </Heading>
      )}
      {children}
    </Flex>
  );
};

export default ContentDetail;
