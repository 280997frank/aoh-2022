import {
  Button,
  Icon,
  Stack,
  Text,
  List,
  ListItem,
  Link,
  useToast,
} from "@chakra-ui/react";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import NextLink from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useState } from "react";

import NavItemMobile from "@/components/Atoms/NavItemMobile";

import { menuScroll } from "@/constants/menu";

import { auth } from "@/connections/firebase";

import type { FC } from "react";
import type { RootState } from "@/states/store";
import { useLogout } from "@/hooks/trackings";

// const iconBack =
//   "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/layout%2FIconBack.png?alt=media&token=b4c16c69-be77-487a-a668-c19d6bee6bba";
interface Tprops {
  onClose: (i: boolean) => void;
}

const DraweItems: FC<Tprops> = ({ onClose }) => {
  const toast = useToast();
  const [isLoggingOut, setLoggingOut] = useState(false);
  const { userEmail } = useSelector(
    (state: RootState) => ({
      userEmail: state.user.email,
    }),
    shallowEqual
  );

  useLogout(isLoggingOut);

  const [isTabsNow, setTabNow] = useState("");
  console.log("isTabNow", isTabsNow);
  return (
    <Stack direction="column" align="flex-start" height="100%" width="100%">
      <Stack
        height="auto"
        align="flex-end"
        p="4"
        mt="5"
        w="100%"
        justifyContent="flex-end"
      >
        <Icon
          as={IoChevronForwardCircleSharp}
          color="#2E4924"
          w={8}
          h={8}
          onClick={() => onClose(false)}
        />
      </Stack>
      <Stack
        flex="1"
        maxH="90%"
        overflowY="auto"
        align="flex-start"
        width="100%"
        mt="2rem !important"
      >
        <List width="100%">
          <ListItem p="4">
            <NextLink passHref href={"/my-tickets"}>
              <Link
                bgColor="transparent"
                colorScheme="transparent"
                _focus={{
                  bgColor: "transparent",
                  outline: "0",
                }}
                color="#F65438"
                fontWeight="bold"
                fontSize="lg"
                width="100%"
                textDecoration="none"
                userSelect="none"
                _hover={{ textDecoration: "none" }}
                display="flex"
                alignItems="center"
              >
                <Text as="span">MY TICKETS</Text>
              </Link>
            </NextLink>
          </ListItem>
          {menuScroll.map((item, index: number) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks

            return (
              <NavItemMobile
                key={index}
                {...item}
                onClose={onClose}
                isTabsNow={isTabsNow}
                setTabNow={setTabNow}
              />
            );
          })}
        </List>
      </Stack>
      {userEmail && (
        <Stack height="5%" p="1" align="flex-start">
          <Button
            bgColor="transparent"
            colorScheme="transparent"
            _focus={{
              bgColor: "transparent",
              outline: "0",
            }}
            color="#2E4924"
            fontWeight="bold"
            fontSize="lg"
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
            LOGOUT
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default DraweItems;
