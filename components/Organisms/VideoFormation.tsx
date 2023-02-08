import React from "react";
import { Box } from "@chakra-ui/react";
import HeadCard from "@/components/Molecules/HeadCard";
import LineBreak from "@/components/Atoms/LineBreak";
import { IHeadCard } from "@/types/headCard";
import { ICarauselItem } from "@/types/carouselItem";
import CarouselVideos from "./CarouselVideos";

interface IVideoInformation {
  headCard: IHeadCard;
  videos: ICarauselItem;
  nodeRef?: any;
}

function VideoFormation({ headCard, videos, nodeRef }: IVideoInformation) {
  return (
    <Box>
      <HeadCard
        title={headCard.title}
        subtitle={headCard.subtitle}
        image={headCard.image}
      />
      <LineBreak />
      <CarouselVideos nodeRef={nodeRef} type={videos.type} data={videos.data} />
      <LineBreak />
    </Box>
  );
}

export default VideoFormation;
