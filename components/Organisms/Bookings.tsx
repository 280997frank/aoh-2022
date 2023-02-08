import { Spinner, ScaleFade, SimpleGrid, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firehooks/firestore";

import { db } from "@/connections/firebase";

import BookingItem from "@/components/Molecules/BookingItem";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import type { TimeSlot } from "@/interfaces/tickets";

const timeslotsRef = collection(
  db,
  "timeslots"
) as CollectionReference<TimeSlot>;
const q = query(timeslotsRef, orderBy("sequence"));

const Bookings: FC = () => {
  const toast = useToast();
  const [timeslots, loading, error] = useCollection(q, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

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
    <>
      <ScaleFade unmountOnExit initialScale={0.9} in={loading}>
        <Spinner size="xl" />
      </ScaleFade>
      <ScaleFade unmountOnExit initialScale={0.9} in={!loading}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
          {timeslots?.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            ?.map(({ id, period, venue, ticketName, isFullyBooked }) => (
              <BookingItem
                key={id}
                id={id}
                venue={venue}
                title={ticketName}
                description={period}
                isFullyBooked={isFullyBooked}
              />
            ))}
        </SimpleGrid>
      </ScaleFade>
    </>
  );
};

export default Bookings;
