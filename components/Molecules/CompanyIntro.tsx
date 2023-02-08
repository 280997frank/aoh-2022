import React, { FC, useState } from "react";
import { Button, Flex, Image, Link, Text } from "@chakra-ui/react";

import { TCompanyIntro } from "@/types/contactUs";
import { useOnClickTracking } from "@/hooks/trackings";

const CompanyIntro: FC<{
  companyIntro?: TCompanyIntro;
}> = ({ companyIntro }) => {
  const [clicked, setClicked] = useState<string | undefined>("");

  useOnClickTracking({
    isClicked: clicked !== undefined && clicked !== "",
    type: "page",
    data: {
      slug: "/drone-arena/bring-your-own-drone",
      title: clicked as string,
    },
  });

  return (
    <Flex direction="column" align="center" width={{ md: "45%", xl: "480px" }}>
      <Image
        src={companyIntro?.image}
        alt="Image Company Intro"
        width={{ base: 160, "2xl": 240 }}
        height={{ base: 160, "2xl": 240 }}
        borderRadius="2xl"
        marginBottom={4}
      />
      <Link
        href={companyIntro?.link}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{}}
        onClick={() => setClicked(companyIntro?.labelCta)}
      >
        <Button
          backgroundColor="brand.green"
          textColor="white"
          fontWeight="bold"
          fontSize={{ base: "md", "2xl": "xl" }}
          lineHeight={{ base: "22px", "2xl": "27px" }}
          marginBottom={{ base: 2, "2xl": 4 }}
          padding={{ "2xl": "30px 40px" }}
          borderRadius="5rem"
          _hover={{}}
        >
          {companyIntro?.labelCta}
        </Button>
      </Link>
      <Text
        fontWeight="medium"
        fontSize={{ base: "xs", lg: "md" }}
        lineHeight={{ base: "16px", lg: "22px" }}
        color="brand.green"
        textAlign="center"
      >
        {companyIntro?.description}
      </Text>
    </Flex>
  );
};

export default CompanyIntro;
