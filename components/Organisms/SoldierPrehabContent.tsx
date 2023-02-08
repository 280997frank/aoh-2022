import React from "react";
import { Box } from "@chakra-ui/react";
import SoldierPrehabCarousel from "@/components/Organisms/SoldierPrehabCarousel";

interface ISoldierPrehabContent {
  titleTab?: string;
  data: [
    {
      title: string;
      url: string;
      type: string;
      description: string;
    }
  ];
}

function SoldierPrehabContent({ titleTab, data }: ISoldierPrehabContent) {
  return (
    <Box marginTop="50px" marginX="5px">
      <SoldierPrehabCarousel titleTab={titleTab} data={data} />
    </Box>
  );
}

export default SoldierPrehabContent;
