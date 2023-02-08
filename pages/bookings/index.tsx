import {
  VStack,
  Stack,
  Heading,
  Text,
  Skeleton,
  Img,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc } from "firebase/firestore";

import TicketButtonGroup from "@/components/Molecules/TicketButtonGroup";
import Bookings from "@/components/Organisms/Bookings";
import Layout from "@/components/Template/Layout";

import { db } from "@/connections/firebase";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import type { IBookings } from "@/interfaces/tickets";

const ticketPage = collection(
  db,
  "ticket-page"
) as CollectionReference<IBookings>;

const BookingsPage: FC = () => {
  const toast = useToast();
  const [bookingPage, loading, error] = useDocumentData(
    doc(ticketPage, "bookings"),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "Copy Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <Layout title="Bookings" isPrivate>
      <VStack
        gap={4}
        maxW={{
          md: "60vw",
        }}
        margin="0 auto"
        padding={{
          base: "2rem 1rem",
          md: "0 0 3rem",
        }}
      >
        <Stack
          alignItems="flex-start"
          justifyContent={{
            base: "space-between",
            md: "flex-end",
          }}
          direction={{
            base: "column-reverse",
            md: "row",
          }}
          w="full"
        >
          <VStack gap={0} w="full">
            <Heading
              fontWeight="bold"
              fontSize={{
                base: "2rem",
                md: "5xl",
              }}
              color="brand.green"
              w="full"
              textAlign="left"
              // lineHeight={{
              //   base: "2.7rem",
              //   md: "1",
              // }}
            >
              Bookings
            </Heading>
          </VStack>
          <TicketButtonGroup />
        </Stack>
        <Skeleton isLoaded={!loading} w="100%">
          <Text
            color="brand.green"
            lineHeight={{
              base: "1.375rem",
              md: "1.6875rem",
            }}
            fontSize={{
              base: "md",
              md: "lg",
            }}
            fontWeight="bold"
            dangerouslySetInnerHTML={{
              __html: bookingPage?.description || "",
            }}
          />
        </Skeleton>
        <Bookings />
        <VStack
          w={{ base: "90%", lg: "full" }}
          alignItems={{ base: "center", lg: "flex-start" }}
          pt={4}
        >
          <Text color="brand.green" fontSize="xl" fontWeight="bold">
            With special thanks
          </Text>
          <Stack
            direction={{ base: "column", lg: "row" }}
            alignItems="center"
            gap={{ base: 4, lg: 8 }}
          >
            <Img
              color="brand.green"
              fontSize="xl"
              fontWeight="bold"
              src="/images/ST Engineering.png"
              alt="ST Engineering"
              htmlWidth="568"
              htmlHeight="96"
              h="3rem"
              w="auto"
            />
            <Img
              color="brand.green"
              fontSize="xl"
              fontWeight="bold"
              src="/images/nescafe.svg"
              alt="Nescafe"
            />
            <Img
              color="brand.green"
              fontSize="xl"
              fontWeight="bold"
              src="/images/sats.svg"
              alt="Sats"
            />
            <Img
              color="brand.green"
              fontSize="xl"
              fontWeight="bold"
              src="/images/Foodfare.png"
              alt="Foodfare: an NTUC Social Enterprise"
            />
          </Stack>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default BookingsPage;
