import {
  chakra,
  VStack,
  Heading,
  Text,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { object } from "yup";
import Link from "next/link";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

import FormInput from "@/components/Atoms/FormInput";
import Button from "@/components/Atoms/Button";
import Layout from "@/components/Template/Layout";

import { requiredEmail } from "@/constants/validationSchema";

import { db, auth } from "@/connections/firebase";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";

interface IForgotPasswordPage {
  email: string;
  emailSent: string;
}

type PageMode = "email" | "success";

const ChakraForm = chakra(Form);

const VALIDATION_SCHEMA = object().shape({
  email: requiredEmail,
});

const INITIAL_VALUES = {
  email: "",
};

const authPages = collection(
  db,
  "authentication-pages"
) as CollectionReference<IForgotPasswordPage>;

const ForgotPasswordPage: FC = () => {
  const toast = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const [pageMode, setPageMode] = useState<PageMode>("email");
  const [forgotPasswordPage, loading, error] = useDocumentData(
    doc(authPages, "forgotPassword"),
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
    <Layout title="Forgot Password">
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
            base: "2rem",
            md: "5xl",
          }}
          color="brand.green"
          w="full"
          lineHeight={{
            base: "2.7rem",
            md: "4.125rem",
          }}
        >
          {pageMode === "success" ? "Password Reset" : "Forgot Password"}
        </Heading>
        <Skeleton isLoaded={!loading}>
          <Text
            color="brand.green"
            lineHeight="1.375rem"
            dangerouslySetInnerHTML={{
              __html:
                (pageMode === "success"
                  ? forgotPasswordPage?.emailSent
                  : forgotPasswordPage?.email) || "",
            }}
          />
        </Skeleton>
        {pageMode === "email" && (
          <Formik
            validationSchema={VALIDATION_SCHEMA}
            initialValues={INITIAL_VALUES}
            onSubmit={async ({ email }) => {
              try {
                setSubmitting(true);
                await sendPasswordResetEmail(auth, email);
                // setPageMode("success");
              } catch (error: any) {
                /* setSubmitting(false);
                toast({
                  title: "Email Request Error",
                  description: error.message || error.error.message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                }); */
              } finally {
                setPageMode("success");
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
                  id="password-reset-form"
                >
                  <FormInput
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="firstnamelastname@domain.com"
                  />
                </ChakraForm>
              );
            }}
          </Formik>
        )}
        <VStack w="full" gap="0.1rem">
          {pageMode === "email" && (
            <Button
              bgColor="brand.orange"
              type="submit"
              form="password-reset-form"
              isLoading={isSubmitting}
            >
              RESET PASSWORD
            </Button>
          )}
          {pageMode === "success" && (
            <Link href="/" passHref>
              <Button as="a" bgColor="brand.orange">
                HOME
              </Button>
            </Link>
          )}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default ForgotPasswordPage;
