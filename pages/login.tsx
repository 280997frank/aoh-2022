import {
  chakra,
  VStack,
  Box,
  Heading,
  Text,
  InputRightElement,
  IconButton,
  Skeleton,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import { object } from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc } from "firebase/firestore";

import FormInput from "@/components/Atoms/FormInput";
import Button from "@/components/Atoms/Button";
import Layout from "@/components/Template/Layout";

import { requiredEmail, requiredString } from "@/constants/validationSchema";

import { auth, db } from "@/connections/firebase";

// import { saveFailedLoginAttempt } from "@/utils/authentication";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import { useLogin } from "@/hooks/trackings";

type PasswordInputType = "password" | "text";

interface AuthPage {
  description: string;
}

const ChakraForm = chakra(Form);

const VALIDATION_SCHEMA = object().shape({
  email: requiredEmail,
  password: requiredString,
});

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const authPages = collection(
  db,
  "authentication-pages"
) as CollectionReference<AuthPage>;

const LoginPage: FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginPage, loading, error] = useDocumentData(doc(authPages, "login"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>("password");

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

  useLogin(loginStatus);

  return (
    <Layout title="Login">
      <VStack
        gap={4}
        maxW="30rem"
        margin="0 auto"
        padding={{
          base: "3rem",
          md: "0 0 3rem",
        }}
      >
        <Heading
          fontWeight="bold"
          fontSize={{
            base: "5xl",
            md: "4rem",
          }}
          color="brand.green"
          w="full"
          lineHeight="4.125rem"
        >
          Our Army
          <br />
          Open House
          <br />
          2022
        </Heading>
        <Skeleton isLoaded={!loading}>
          <Text
            color="brand.green"
            lineHeight="1.375rem"
            dangerouslySetInnerHTML={{ __html: loginPage?.description || "" }}
          />
        </Skeleton>
        <Formik
          validationSchema={VALIDATION_SCHEMA}
          initialValues={INITIAL_VALUES}
          onSubmit={async ({ email, password }) => {
            try {
              await signInWithEmailAndPassword(auth, email, password);
              setLoginStatus(true);
              router.push("/");
            } catch (error: any) {
              setLoginStatus(false);
              let errorMessage = error.message || "Something wrong happens";
              const firebaseErrorMessages = [
                "auth/user-not-found",
                "auth/wrong-password",
              ];

              if (
                firebaseErrorMessages.find((msg) => errorMessage.includes(msg))
              ) {
                // await saveFailedLoginAttempt(email);
                errorMessage = "Wrong email/password";
              }

              toast({
                title: "Login Error",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            } finally {
              setLoginStatus(false);
            }
          }}
        >
          {() => {
            return (
              <ChakraForm
                w="full"
                d="flex"
                flexDir="column"
                gap={4}
                id="login-form"
              >
                <FormInput
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="firstnamelastname@domain.com"
                />
                <FormInput
                  id="password"
                  name="password"
                  label="Password"
                  type={passwordInputType}
                  placeholder="**************"
                  InputRightElement={
                    <InputRightElement color="gray.300" fontSize="1.2em">
                      <IconButton
                        bgColor="transparent"
                        color="brand.orange"
                        aria-label="Toggle Password Visibility"
                        icon={
                          passwordInputType === "password" ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )
                        }
                        onClick={() => {
                          setPasswordInputType(
                            passwordInputType === "password"
                              ? "text"
                              : "password"
                          );
                        }}
                      />
                    </InputRightElement>
                  }
                />
                <Box w="full" mt="-0.75rem">
                  <Link href="/forgot-password" passHref>
                    <ChakraLink
                      fontWeight="bold"
                      color="brand.lightGreen"
                      fontSize={{
                        base: "xs",
                        md: "md",
                      }}
                    >
                      Forgot Password?
                    </ChakraLink>
                  </Link>
                </Box>
              </ChakraForm>
            );
          }}
        </Formik>
        <VStack w="full" gap="0.1rem">
          <Button bgColor="brand.green" type="submit" form="login-form">
            LOGIN
          </Button>
          <Link href="/register" passHref>
            <Button as="a" bgColor="brand.orange">
              REGISTER
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default LoginPage;
