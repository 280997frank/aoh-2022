import { VStack, Img, Heading, Text, AspectRatio, Box } from "@chakra-ui/react";

import type { FC } from "react";
import type { Session } from "@/interfaces/sessions";

type TimeSlot = Session["timeSlots"][0];
interface SessionCardProps extends TimeSlot {
  isSingleItem?: boolean;
}

const SessionCard: FC<SessionCardProps> = ({
  title,
  thumbnail,
  startTime,
  endTime,
  isSingleItem = false,
}) => {
  return (
    <Box
      p={1}
      gap={4}
      bgColor="rgba(255, 254, 229,0.9)"
      border="5px solid #FBFAE5"
      minW={{ lg: "18.75rem" }}
      maxW={{ lg: "20%" }}
      h={{ lg: "100%" }}
      m={{ base: "0 0 0 0", lg: isSingleItem ? "auto" : 0 }}
      // filter="drop-shadow(0px 3px 11px rgba(0, 0, 0, 0.25))"
    >
      <Img src={thumbnail} alt="" />
      <Heading
        color="brand.orange"
        fontSize={{ base: "md", lg: "1.3125rem" }}
        textTransform="uppercase"
        textAlign="left"
        // w="full"
        // textOverflow={{lg: "ellipse"}}
        // overflow={{lg: "hidden"}}
      >
        {title}
      </Heading>
      <Text
        textAlign="left"
        w="full"
        color="brand.green"
        fontSize={{ base: "sm", lg: "1.1875rem" }}
      >
        {`${startTime.replace(":", "")} - ${endTime.replace(":", "")}hrs`}
      </Text>
    </Box>
  );
};

export default SessionCard;
