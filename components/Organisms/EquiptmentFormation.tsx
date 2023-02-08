import React from "react";
import { Box, Flex, Grid, GridItem, Heading, Skeleton } from "@chakra-ui/react";
import CardItem from "@/components/Molecules/CardItem";
import HeadCard from "@/components/Molecules/HeadCard";
import LineBreak from "@/components/Atoms/LineBreak";
import { ICardItem } from "@/types/cardItem";
import { IHeadCard } from "@/types/headCard";

interface IEquipmentFormation {
  headCard: IHeadCard;
  data: ICardItem[];
  onClick: (item: ICardItem) => void;
}

const EquiptmentFormation: React.FC<IEquipmentFormation> = ({
  headCard,
  data = [],
  onClick,
}) => {
  // const route = useRouter();
  // const { query } = route;
  return (
    <Box>
      <HeadCard
        title={headCard.title}
        subtitle={headCard.subtitle}
        image={headCard.image}
      />
      <LineBreak />
      <Heading
        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
        color="#007761"
        mb="1rem"
        textTransform="uppercase"
      >
        EQUIPMENT
      </Heading>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={4}
        py="20px"
      >
        {data.map((item: ICardItem, i: number) => {
          return (
            <GridItem key={i}>
              <CardItem
                title={item.title}
                images={item.images}
                thumbnail={item.thumbnail}
                description={item.description}
                onClick={() => onClick(item)}
              />
            </GridItem>
          );
        })}
      </Grid>
      <LineBreak />
    </Box>
  );
};

export default EquiptmentFormation;
