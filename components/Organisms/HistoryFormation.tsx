import LineBreak from "@/components/Atoms/LineBreak";
import ContentDetail from "@/components/Molecules/ContentDetail";
import HeadCard from "@/components/Molecules/HeadCard";
import { IHeadCard } from "@/types/headCard";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
interface IHistoryFormation {
  headCard: IHeadCard;
  description: string;
}

const HistoryFormation: React.FC<IHistoryFormation> = ({
  headCard,
  description,
}) => {
  return (
    <Box>
      <HeadCard
        title={headCard.title}
        subtitle={headCard.subtitle}
        image={headCard.image}
      />
      <LineBreak />
      <ContentDetail title="Information">
        <Text
          dangerouslySetInnerHTML={{ __html: description }}
          marginBottom="50px"
        />
      </ContentDetail>
      <LineBreak />
    </Box>
  );
};

export default HistoryFormation;
