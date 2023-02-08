import LineBreak from "@/components/Atoms/LineBreak";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useCollapse from "react-collapsed";

export interface ICaptureYourNSMomentsFaqProps {
  faq: [
    {
      description: string;
      title: string;
    }
  ];
}

interface ICaptureYourNSMomentsFaq {
  data: ICaptureYourNSMomentsFaqProps;
  goToForm: () => void;
}

function lineItems(list: any) {
  return list.map((item: any, index: number) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <Box key={index}>
        <Flex
          w="100%"
          justifyContent={isExpanded ? "space-between" : "flex-start"}
          alignItems="center"
        >
          <Text fontSize="xl" fontWeight="bold" color="brand.green">
            {item.title}
          </Text>
          <Button
            background="transparent"
            color="brand.orange"
            fontSize="2xl"
            _hover={{
              background: "none",
            }}
            _focus={{
              border: "none",
              outline: "none",
            }}
            {...getToggleProps()}
          >
            {isExpanded ? "-" : "+"}
          </Button>
        </Flex>
        <Box {...getCollapseProps()}>
          <Text
            className="customLink"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </Box>
        <LineBreak margin="1rem 0" />
      </Box>
    );
  });
}

export default function Faq({ data, goToForm }: ICaptureYourNSMomentsFaq) {
  useEffect(() => {
    if (data) {
      const link = document.getElementById("openNSStoriesFormFAQ");
      link?.addEventListener("click", function (e) {
        e.preventDefault();
        goToForm();
      });
    }
  }, [data, goToForm]);

  return (
    <Box>
      <Heading mb="3rem" textAlign="center" color="brand.green">
        FAQ
      </Heading>
      {lineItems(data.faq)}
    </Box>
  );
}
