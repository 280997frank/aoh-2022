import { HStack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

import Button from "@/components/Atoms/Button";

import { auth } from "@/connections/firebase";
import { useLogout } from "@/hooks/trackings";

const TicketButtonGroup = () => {
  const toast = useToast();
  const [isLoggingOut, setLoggingOut] = useState(false);

  useLogout(isLoggingOut);

  return (
    <HStack w={{ base: "full", md: "60%" }}>
      <Button
        bgColor="brand.orange"
        isLoading={isLoggingOut}
        onClick={async () => {
          try {
            setLoggingOut(true);
            await auth.signOut();
          } catch (error: any) {
            toast({
              title: "Logout Error",
              description: error.message || error.error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          } finally {
            setLoggingOut(false);
          }
        }}
      >
        <Text mt={1}>LOGOUT</Text>
      </Button>
      <Link href="/bookings" passHref>
        <Button as="a" bgColor="brand.orange">
          <Text mt={1}>BOOKINGS</Text>
        </Button>
      </Link>
      <Link href="/my-tickets" passHref>
        <Button as="a" bgColor="brand.orange" variant="outline">
          <Text mt={1}>MY TICKETS</Text>
        </Button>
      </Link>
    </HStack>
  );
};

export default TicketButtonGroup;
