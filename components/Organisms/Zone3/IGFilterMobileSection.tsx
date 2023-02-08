import Button from "@/components/Atoms/Button";
import { IIGfilter, TKidsZone } from "@/types/kids-zone";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const IGFilterMobileSection: TKidsZone<IIGfilter> = ({ data, setTracker }) => {
  return (
    <Flex
      flexDir="column"
      p={6}
      alignItems="center"
      textAlign="center"
      gridGap={4}
    >
      <Heading
        color="brand.green"
        as="h2"
        fontSize="24px"
        lineHeight="23px"
        mb="10px"
      >
        {data.title}
      </Heading>
      <Text
        fontWeight="400"
        fontSize="0.875rem"
        lineHeight="19px"
        textAlign="center"
        dangerouslySetInnerHTML={{ __html: data?.description || "" }}
        mb="40px"
      />
      <Image src={data.image} alt="phoneImage" width="250px" mb="42px" />
      <Link href={data.url}>
        <a target="_blank">
          <Button onClick={setTracker} bgColor="brand.pink">
            {data.btnLabel}
          </Button>
        </a>
      </Link>
    </Flex>
  );
};

export default IGFilterMobileSection;
