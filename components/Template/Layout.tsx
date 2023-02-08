import { FC, ReactNode, useRef, useEffect, useState } from "react";
import {
  Box,
  BoxProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Script from "next/script";

import Navbar from "@/components/Organisms/Navbar";
import DrawerItems from "@/components/Molecules/DrawerItems";
import GameModal from "@/components/Molecules/GameModal";
import BackButton from "@/components/Atoms/BackButton";

import { auth } from "@/connections/firebase";

import { actions as userActions } from "@/states/user/slice";
import BestView from "./BestView";
import pusher from "@/connections/pusher";

interface LayoutProps extends BoxProps {
  children: ReactNode | any;
  title: string;
  isPrivate?: boolean;
  description?: string;
  withBackButton?: boolean;
  backButtonAction?: () => void;
}

const Layout: FC<LayoutProps> = ({
  children,
  title,
  isPrivate = false,
  description = "",
  withBackButton = false,
  backButtonAction,
  ...props
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const [isChecking, setChecking] = useState(true);
  const layoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* useEffect(() => {
    auth.signOut();
  }, []); */

  useEffect(() => {
    const resetHeight = () => {
      if (layoutRef.current) {
        layoutRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    resetHeight();
    window.addEventListener("resize", resetHeight, false);

    return () => window.removeEventListener("resize", resetHeight, false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(
          userActions.setProfile({
            id: "",
            email: "",
            firstName: "",
            lastName: "",
          })
        );
      }

      if (isPrivate && !user) {
        router.push("/register");
      }

      if (!isPrivate) {
        setChecking(false);
      }

      if (user) {
        let firstName = "";
        let lastName = "";
        let email = "";

        if (user.email) {
          email = user.email;
        }

        if (user.displayName) {
          const splitName = user.displayName.split(" ");
          if (splitName.length === 1) {
            firstName = splitName[0];
          } else if (splitName.length > 1) {
            lastName = splitName.pop() || "";
            firstName = splitName.join(" ");
          }
        }

        dispatch(
          userActions.setProfile({
            id: user.uid,
            email,
            firstName,
            lastName,
          })
        );

        setChecking(false);
      }
    });

    return unsubscribe;
  }, [dispatch, isPrivate, router]);

  // pusher
  useEffect(() => {
    pusher.subscribe("aoh2022");
  }, []);

  useEffect(() => {
    window.onErrorReCaptcha = () => {
      toast({
        title: "reCAPTCHA Error",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    };
  }, [toast]);

  if (isChecking) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{title} | Our Army Open House 2022</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=UA-213182888-2" />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NBQ6SZD3EY');
          gtag('config', 'UA-213182888-2');
        `,
        }}
      />
      <Box
        as="main"
        ref={layoutRef}
        w="100%"
        h="100vh"
        maxHeight="-webkit-fill-available"
        display="flex"
        flexDir="column"
        bgColor="#E7E6D0"
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="cover"
        overflow="hidden"
        pb={{ base: 8, sm: 0 }}
        sx={{
          overflow: "hidden !important",
          "@supports (-webkit-touch-callout: none)": {
            paddingBottom: "0 !important",
          },
        }}
        {...props}
      >
        <BestView>
          <Drawer
            placement="right"
            onClose={() => setOpenSidebar(false)}
            // size="md"
            isOpen={isOpenSidebar}
          >
            <DrawerContent
              opacity="0.98"
              height="100%"
              // top="50% !important"
              // transform="translateY(-50%) !important"
              maxW="90vw !important"
              // borderRightRadius="20px"
            >
              <DrawerBody
                bgColor="#FFFEE5"
                opacity="0.9"
                // borderRightRadius="20px"
                overflowY="auto"
                p="0px !important"
              >
                <DrawerItems
                  onClose={(i) => {
                    setOpenSidebar(i);
                  }}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Navbar onOpen={() => setOpenSidebar(true)} />
          {withBackButton && (
            <BackButton
              withLabel
              onClick={backButtonAction ? backButtonAction : undefined}
            />
          )}
          <Box
            overflow="hidden auto"
            bg="#E7E6D0"
            flex="1"
            mt={{ md: withBackButton ? "-2.75rem" : 0 }}
          >
            {children}
          </Box>
        </BestView>
      </Box>
      <GameModal />
    </>
  );
};

export default Layout;
