import { Spinner, ScaleFade, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { collection, query, orderBy, where } from "firebase/firestore";
import { useCollection } from "react-firehooks/firestore";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { db } from "@/connections/firebase";

import TicketItem from "@/components/Molecules/TicketItem";

import { actions as userActions } from "@/states/user/slice";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import type { Ticket } from "@/interfaces/tickets";
import type { RootState } from "@/states/store";

const Tickets: FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { userEmail } = useSelector(
    (state: RootState) => ({
      userEmail: state.user.email,
    }),
    shallowEqual
  );
  const ticketsRef = collection(db, "tickets") as CollectionReference<Ticket>;
  const q = query(
    ticketsRef,
    orderBy("bookingTime"),
    where("email", "==", userEmail)
  );
  const [tickets, loading, error] = useCollection(q, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  useEffect(() => {
    if (tickets) {
      dispatch(userActions.setTicketQty(tickets?.docs.length));
    }
  }, [dispatch, tickets]);

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

      <VStack gap={4} w="full">
        {tickets?.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          ?.map(({ id, pax, venue, timeSlot, eventDate }) => (
            <TicketItem
              key={id}
              id={id}
              pax={pax}
              venue={venue}
              time={timeSlot}
              description={eventDate}
            />
          ))}
      </VStack>
    </>
  );
};

export default Tickets;
