import { IIGfilter, TKidsZone } from "@/types/kids-zone";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";

const IGFilterSection: TKidsZone<IIGfilter> = ({ data, setTracker }) => {
  return (
    <Box
      className="content"
      display="flex"
      height="100%"
      justifyContent="center"
    >
      <Box height="100%" borderRadius="40px" marginTop={8} p={4} maxW="70%">
        <Flex justifyContent="center" alignItems="center" gridGap={20}>
          <Image src={data.image} alt="phoneImage" width="281px" />
          <Flex flexDir="column">
            <Heading color="brand.green" as="h2" fontSize="2.375rem" mb="28px">
              {data.title}
            </Heading>
            <Text
              fontWeight="400"
              fontSize="1.3125rem"
              lineHeight="29px"
              mb="49px"
              dangerouslySetInnerHTML={{ __html: data?.description || "" }}
            />
            <Link href={data.url} target="_blank" _hover={{}}>
              <Button
                borderRadius="full"
                p="11px 57px"
                bgColor="brand.pink"
                fontSize="1.125rem"
                lineHeight="normal"
                color="white"
                _hover={{ textDecorationStyle: "none" }}
                _active={{}}
                _focus={{}}
                textDecoration="none"
                onClick={setTracker}
              >
                {data.btnLabel}
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default IGFilterSection;
