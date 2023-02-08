import {
  HStack,
  VStack,
  Stack,
  Icon,
  Img,
  Heading,
  Text,
  Box,
  AspectRatio,
  useToast,
} from "@chakra-ui/react";
import { RiMapPin2Fill } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { useRef, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import QRCode from "qrcode";

import type { FC } from "react";

dayjs.extend(customParseFormat);

interface TicketItemProps {
  id: string;
  pax: number;
  venue: string;
  time: string;
  description: string;
}

const TicketItem: FC<TicketItemProps> = ({
  id,
  pax,
  venue,
  time,
  description,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toast = useToast();

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        id,
        {
          errorCorrectionLevel: "H",
          // type: "image/png",
          // quality: 0.3,
          margin: 0,
          scale: 5.5,
          color: {
            dark: "#F65438",
            light: "#FFFEE5",
          },
        },
        function (error: Error) {
          if (error) {
            toast({
              title: "QR Code Error",
              description: error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }
      );
    }
  }, [id, toast]);

  return (
    <HStack
      gap={{ base: 2, md: 0 }}
      bgColor="brand.cream"
      borderRadius="lg"
      w={{ base: "92.5vw", md: "full" }}
      p={{ base: 4, lg: 0 }}
      alignItems={{ base: "flex-start", lg: "stretch" }}
    >
      <AspectRatio w="40%" maxW="16rem" ratio={1}>
        <Img
          src="/images/aoh-visual.jpg"
          htmlWidth="1999"
          htmlHeight="1124"
          m="0 !important"
          borderLeftRadius={{ base: "md", lg: "lg" }}
          borderRightRadius={{ base: "md", lg: 0 }}
          w={{ base: "40%" }}
        />
      </AspectRatio>
      <Stack
        flexDir={{ base: "column", lg: "row" }}
        gap={6}
        justifyContent="space-between"
        w="full"
        p={{ md: 4 }}
      >
        <VStack alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Text
              color="brand.green"
              fontWeight="bold"
              fontSize={{ base: "xs", md: "lg" }}
            >
              Ticket ID: {id}
            </Text>
            <Heading
              color="brand.green"
              fontWeight="bold"
              fontSize={{ base: "xl", md: "2rem" }}
            >
              Admission Ticket
              <br />({time})
            </Heading>
            <Text color="brand.green" fontWeight="bold" fontSize={{ md: "xl" }}>
              Pax: {pax}
            </Text>
          </Box>
          <Box>
            <Text fontSize={{ md: "xl" }} color="brand.green" w="full">
              <Icon as={RiMapPin2Fill} color="brand.orange" />
              &nbsp;
              {venue}
            </Text>
            <Text fontSize={{ md: "xl" }} color="brand.green">
              <Icon as={BiCalendar} color="brand.orange" />
              &nbsp;
              {dayjs(description, "DD-MM-YYYY").format("DD MMM YYYY")}
            </Text>
          </Box>
        </VStack>
        <canvas ref={canvasRef} />
      </Stack>
    </HStack>
  );
};

export default TicketItem;
