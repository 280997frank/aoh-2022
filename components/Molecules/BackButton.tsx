import { Button, Text } from "@chakra-ui/react";

import type { FC } from "react";
import { useRouter } from "next/router";
import React from "react";
import ChevronLeftRounded from "@/assets/icons/ChevronLeftRounded";

const BackButton: FC = () => {
  const router = useRouter();

  return (
    <Button
      bg="transparent"
      color="brand.green"
      _focus={{ backgroundColor: "transparent" }}
      _hover={{ backgroundColor: "transparent" }}
      _active={{ backgroundColor: "transparent" }}
      textAlign="center"
      verticalAlign="center"
      height="40px"
      lineHeight="40px"
      onClick={() => router.back()}
    >
      <ChevronLeftRounded w="30px" height="30px" />
      <Text
        ml={{ base: "0", md: "5px" }}
        mt="3px"
        display={{ base: "none", md: "block" }}
      >
        Back
      </Text>
    </Button>
  );
};

export default BackButton;
