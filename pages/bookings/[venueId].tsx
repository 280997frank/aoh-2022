import {
  VStack,
  Stack,
  Heading,
  Text,
  Skeleton,
  ScaleFade,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc } from "firebase/firestore";

import TicketButtonGroup from "@/components/Molecules/TicketButtonGroup";
import BookingFormContainer from "@/components/Organisms/BookingFormContainer";
import Layout from "@/components/Template/Layout";

import { db } from "@/connections/firebase";

import { useVenueDetail } from "@/hooks/tickets";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import type { IBookings } from "@/interfaces/tickets";

const ticketPage = collection(
  db,
  "ticket-page"
) as CollectionReference<IBookings>;

const BookingDetailPage: FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { venueId } = router.query;
  const [venueDetail, venueDetailLoading] = useVenueDetail(
    typeof venueId === "string" ? venueId : "undefined"
  );
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
          md: "80vw",
          "2xl": "70vw",
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
              lineHeight={{
                base: "2.7rem",
                md: "1",
              }}
            >
              Bookings
            </Heading>
            <Skeleton
              isLoaded={!loading}
              w={{ lg: "200%" }}
              ml={{ lg: "100% !important" }}
            >
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
                // mb={8}
                fontWeight="bold"
                dangerouslySetInnerHTML={{
                  __html: bookingPage?.description || "",
                }}
              />
              {/* <Text
                color="brand.green"
                lineHeight={{
                  base: "1.375rem",
                  md: "1.6875rem",
                }}
                fontSize={{
                  base: "md",
                  md: "lg",
                }}
                // mb={8}
                fontWeight="bold"
                dangerouslySetInnerHTML={{
                  __html: bookingPage?.description2 || "",
                }}
              /> */}
            </Skeleton>
          </VStack>
          <TicketButtonGroup />
        </Stack>
        <ScaleFade unmountOnExit initialScale={0.9} in={venueDetailLoading}>
          <Spinner size="xl" />
        </ScaleFade>
        <ScaleFade unmountOnExit initialScale={0.9} in={!!venueDetail}>
          <BookingFormContainer
            venue={venueDetail?.venue || ""}
            title="Admission Ticket"
            description={venueDetail?.period || ""}
          />
        </ScaleFade>
      </VStack>
    </Layout>
  );
};

export default BookingDetailPage;
