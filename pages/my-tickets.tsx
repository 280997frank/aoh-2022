import { VStack, Stack, Heading, Text } from "@chakra-ui/react";
import { useSelector, shallowEqual } from "react-redux";

import TicketButtonGroup from "@/components/Molecules/TicketButtonGroup";
import Tickets from "@/components/Organisms/Tickets";
import Layout from "@/components/Template/Layout";

import type { FC } from "react";
import type { RootState } from "@/states/store";

const MyTicketsPage: FC = () => {
  const { ticketQty } = useSelector(
    (state: RootState) => ({
      ticketQty: state.user.ticketQty,
    }),
    shallowEqual
  );

  return (
    <Layout title="My Tickets" isPrivate>
      <VStack
        gap={4}
        maxW={{
          md: "80vw",
          "2xl": "60vw",
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
          <VStack gap={0} w="full" alignItems="flex-start">
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
              My Tickets
            </Heading>
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
            >
              {ticketQty} ticket{ticketQty > 1 && "s"}
            </Text>
          </VStack>
          <TicketButtonGroup />
        </Stack>
        <Tickets />
      </VStack>
    </Layout>
  );
};

export default MyTicketsPage;
