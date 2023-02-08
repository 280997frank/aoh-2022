import { VStack, Text, Skeleton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";

import Button from "@/components/Atoms/Button";

import { db, auth } from "@/connections/firebase";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import type { IRegisterPage } from "@/interfaces/registration";
import type { RootState } from "@/states/store";
import { useLogin } from "@/hooks/trackings";

const authPages = collection(
  db,
  "authentication-pages"
) as CollectionReference<IRegisterPage>;

const RegisterSuccess: FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoggingIn, setLoggingIn] = useState(false);
  const { registerPayload } = useSelector(
    (state: RootState) => ({
      registerPayload: state.register,
    }),
    shallowEqual
  );

  const [registerPage, loading, error] = useDocumentData(
    doc(authPages, "register"),
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

  useLogin(isLoggingIn);

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <Text
          color="brand.green"
          lineHeight={{
            base: "1.375rem",
            md: "1.6875rem",
          }}
          fontSize={{
            base: "md",
            md: "xl",
          }}
          mb={8}
          fontWeight="bold"
          textAlign="justify"
          dangerouslySetInnerHTML={{ __html: registerPage?.success || "" }}
        />
      </Skeleton>
      <VStack w="full" gap="0.5rem">
        <Button
          isLoading={isLoggingIn}
          bgColor="brand.orange"
          onClick={async () => {
            try {
              setLoggingIn(true);
              await signInWithEmailAndPassword(
                auth,
                registerPayload.email,
                registerPayload.password
              );
              router.push("/bookings");
            } catch (error: any) {
              setLoggingIn(false);
              console.error(error.message);
              toast({
                title: "Login Error",
                description:
                  "Something wrong happened. Please log in manually.",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete() {
                  router.push("/login");
                },
              });
            }
          }}
        >
          LOGIN
        </Button>
      </VStack>
    </>
  );
};

export default RegisterSuccess;
