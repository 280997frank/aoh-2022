import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

export interface ICaptureYourNSMomentsCategoriesProps {
  title: string;
  categories: [
    {
      title: string;
      list: string[];
    }
  ];
}

interface ICaptureYourNSMomentsCategories {
  data: ICaptureYourNSMomentsCategoriesProps;
}

const COLOR_LIST = [
  "brand.orange",
  "brand.green",
  "brand.lightGreen",
  "brand.cream",
  "brand.tallPoppy",
];

export default function Categories({ data }: ICaptureYourNSMomentsCategories) {
  return (
    <Box px={{ base: "0", lg: "10%" }} w="100%">
      <Heading textAlign="center" color="brand.green" mb="3rem">
        {data.title}
      </Heading>
      {data.categories.map((item, i) => {
        return (
          <Flex
            mb="1rem"
            key={i}
            backgroundColor={COLOR_LIST[i]}
            color={i === 3 ? "brand.orange" : "white"}
            borderRadius="lg"
          >
            <Box p="1.5rem 1rem">
              <Heading>0{i + 1}</Heading>
            </Box>
            <Box p="1.5rem 1rem">
              <Text fontWeight="bold" fontSize="xl">
                {item.title}
              </Text>
              <UnorderedList>
                {item.list.map((itemList, j) => {
                  return <ListItem key={j}>{itemList}</ListItem>;
                })}
              </UnorderedList>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}
