import NavItem from "@/components/Atoms/NavItem";
import {
  Box,
  Flex,
  Image,
  IconButton,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { menuScroll } from "@/constants/menu";
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

const Logo =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/layout%2FAOH22_Logo.png?alt=media&token=b6c3d7b5-b398-4259-862a-c0ed841c3838";
import { GiHamburgerMenu } from "react-icons/gi";

interface Props {
  onOpen: () => void;
}

const Navbar: FC<Props> = ({ onOpen }) => {
  const { push } = useRouter();
  const router = useRouter();
  const [position, setPosition] = useState("");
  // const [isDesktop] = useMediaQuery(
  //   "(min-width: 48em) and (orientation: landscape)"
  // );

  useEffect(() => {
    if (router.pathname === "/") {
      setPosition("absolute");
    } else {
      setPosition("relative");
    }
  }, [router]);

  return (
    <Box
      // as="aside"
      width="100vw"
      // pos="fixed"
      // top="0"
      // left="0"
      display="flex"
      flexDir="column"
      transition=".5s"
      zIndex="banner"
      height="unset"
      bgColor="transparent"
      __css={{ position: position }}
    >
      <Stack
        height="100%"
        display={{
          base: "none",
          md: "flex",
        }}
        direction="row"
        width={{
          base: "95%",
          lg: "99%",
          "2xl": "85%",
        }}
        p="2rem"
        justifyContent="center"
        ml="auto"
        mr="auto"
        align="center"
        // justifyContent="center"
      >
        <Stack
          p="1"
          justifyContent="center"
          // alignItems="center"
          align="flex-start"
          width="15%"
        >
          <Image
            src={Logo}
            w="100%"
            alt="logo"
            onClick={() => push("/#home")}
            cursor="pointer"
          />
        </Stack>
        <Stack
          p="1"
          justifyContent="center"
          alignItems="center"
          direction="row"
          flex="1"
          // pl="3rem"
          // pr="3rem"
        >
          <Stack
            direction="row"
            align="center"
            borderRadius="full"
            bgColor="#f3f2e7"
            w="auto"
            flex="1"
            pl={{
              lg: "1rem",
              "2xl": "2rem",
            }}
            pr={{
              lg: "1rem",
              "2xl": "2rem",
            }}
            spacing={0}
          >
            {menuScroll.map((item, index: number) => {
              return <NavItem key={index} {...item} />;
            })}
          </Stack>
          <Stack p="1" justifyContent="center" alignItems="center">
            <Button
              colorScheme="#F65438"
              bgColor="#F65438"
              borderRadius="full"
              fontWeight="bold"
              onClick={() => push("/bookings")}
              fontSize={{
                base: "smaller",
                md: "12px",
                "2xl": "md",
              }}
              pt={{
                md: 0,
                "2xl": 1,
              }}
            >
              BOOK YOUR TICKETS!
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {/* mobile */}
      <Flex
        height="100%"
        display={{
          base: "flex",
          md: "none",
        }}
        p="2"
        pr="1"
        pl="2"
        direction="row"
        mt="2"
        mb="2"
      >
        <Stack p="1" justifyContent="center" alignItems="center">
          <Image
            src={Logo}
            w="120px"
            alt="logo"
            onClick={() => push("/#home")}
            cursor="pointer"
          />
        </Stack>

        <Stack p="1" justifyContent="center" alignItems="center" flex="1">
          <Button
            ml="2"
            colorScheme="#F65438"
            bgColor="#F65438"
            borderRadius="full"
            alignSelf="center"
            fontWeight="bold"
            onClick={() => push("/bookings")}
            fontSize="smaller"
            size="sm"
            pl="6"
            pr="6"
            justifyContent="center"
            textAlign="center"
            pt="1"
          >
            BOOK YOUR TICKETS!
          </Button>
        </Stack>
        <Stack>
          <Button
            h="100%"
            bgColor="transparent"
            as={IconButton}
            aria-label="Options"
            icon={<GiHamburgerMenu fill="#2E4924" />}
            colorScheme="transparent"
            _focus={{
              bgColor: "transparent",
              outline: "0",
            }}
            onClick={onOpen}
            textDecoration="none"
            userSelect="none"
            _hover={{ textDecoration: "none", bgColor: "transparent" }}
            _active={{
              bgColor: "transparent",
              outline: "0",
            }}
            outline="0"
            boxShadow="none !important"
          />
        </Stack>
        {/* <Spacer /> */}
      </Flex>
    </Box>
  );
};

export default Navbar;
