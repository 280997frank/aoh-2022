import { VStack, Icon, Box, Img, Heading, Text } from "@chakra-ui/react";
import { RiMapPin2Fill } from "react-icons/ri";
import Link from "next/link";

import type { FC } from "react";

interface BookingItemProps {
  id: string;
  venue: string;
  title: string;
  description: string;
  isFullyBooked: boolean;
}

const BookingItem: FC<BookingItemProps> = ({
  id,
  venue,
  title,
  description,
  isFullyBooked,
}) => {
  const content = (
    <VStack as={isFullyBooked ? "div" : "a"} gap={0}>
      <Heading
        fontSize="lg"
        bgColor={isFullyBooked ? "grey" : "brand.orange"}
        color="white"
        w="full"
        borderTopRadius="2xl"
        p={3}
        minH={{
          md: "4.8125rem",
          xl: "0",
        }}
        d="flex"
        alignItems="center"
      >
        <Box mr={2} mt={1}>
          <Icon as={RiMapPin2Fill} color="white" />
        </Box>
        <Text mt={1}>
          {venue}
          {isFullyBooked && (
            <>
              <br />
              Fully Booked
            </>
          )}
        </Text>
      </Heading>
      {isFullyBooked ? (
        <Img
          src="/images/fully-booked.png"
          htmlWidth="389"
          htmlHeight="272"
          m="0 !important"
        />
      ) : (
        <Img
          src="/images/aoh-visual.jpg"
          htmlWidth="1999"
          htmlHeight="1124"
          m="0 !important"
        />
      )}
      <Box
        bgColor="brand.cream"
        w="full"
        borderBottomRadius="2xl"
        p={4}
        m="0 !important"
      >
        <Text color="brand.green" fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text color="brand.green">{description}</Text>
      </Box>
    </VStack>
  );

  if (isFullyBooked) {
    return content;
  }

  return (
    <Link href={`/bookings/${id}`} passHref>
      {content}
    </Link>
  );
};

export default BookingItem;
