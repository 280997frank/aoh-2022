import {
  chakra,
  VStack,
  Heading,
  Text,
  Skeleton,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { object, ref } from "yup";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc } from "firebase/firestore";

import FormInput from "@/components/Atoms/FormInput";
import Button from "@/components/Atoms/Button";
import Layout from "@/components/Template/Layout";

import { requiredPassword, requiredString } from "@/constants/validationSchema";

import { handleResetPassword } from "@/utils/authentication";

import { db } from "@/connections/firebase";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";

interface IPasswordChangePage {
  description: string;
}

type PasswordInputType = "password" | "text";

const ChakraForm = chakra(Form);

const VALIDATION_SCHEMA = object().shape({
  newPassword: requiredPassword,
  newPasswordConfirm: requiredString.oneOf(
    [ref("newPassword"), null],
    "Passwords must match"
  ),
});

const INITIAL_VALUES = {
  newPassword: "",
  newPasswordConfirm: "",
};

const authPages = collection(
  db,
  "authentication-pages"
) as CollectionReference<IPasswordChangePage>;

const PasswordChangePage: FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>("password");
  const [passwordConfirmInputType, setPasswordConfirmInputType] =
    useState<PasswordInputType>("password");
  const [forgotPasswordPage, loading, error] = useDocumentData(
    doc(authPages, "passwordChange"),
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
    <Layout title="Contact Us">
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
          New Password
        </Heading>
        <Skeleton isLoaded={!loading}>
          <Text
            color="brand.green"
            lineHeight="1.375rem"
            dangerouslySetInnerHTML={{
              __html: forgotPasswordPage?.description || "",
            }}
          />
        </Skeleton>
        <Formik
          validationSchema={VALIDATION_SCHEMA}
          initialValues={INITIAL_VALUES}
          onSubmit={async ({ newPassword }) => {
            try {
              setSubmitting(true);
              const url = new URL(window.location.href);
              const params = new URLSearchParams(url.search);

              await handleResetPassword(
                params.get("oobCode") || "",
                newPassword
              );
              toast({
                title: "Password Changed",
                status: "success",
                duration: 3000,
                isClosable: true,
                onCloseComplete() {
                  router.push("/login");
                },
              });
            } catch (error: any) {
              toast({
                title: "Password Change Error",
                description: error.message || error.error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            } finally {
              setSubmitting(false);
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
                id="password-change-form"
              >
                <FormInput
                  id="newPassword"
                  name="newPassword"
                  label="New password"
                  type={passwordInputType}
                  placeholder="********"
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
                <FormInput
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  label="Confirm New Password"
                  type={passwordConfirmInputType}
                  placeholder="********"
                  InputRightElement={
                    <InputRightElement color="gray.300" fontSize="1.2em">
                      <IconButton
                        bgColor="transparent"
                        color="brand.orange"
                        aria-label="Toggle Password Visibility"
                        icon={
                          passwordConfirmInputType === "password" ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )
                        }
                        onClick={() => {
                          setPasswordConfirmInputType(
                            passwordConfirmInputType === "password"
                              ? "text"
                              : "password"
                          );
                        }}
                      />
                    </InputRightElement>
                  }
                />
              </ChakraForm>
            );
          }}
        </Formik>
        <VStack w="full" gap="0.1rem">
          <Button
            bgColor="brand.orange"
            type="submit"
            form="password-change-form"
            isLoading={isSubmitting}
          >
            CHANGE PASSWORD
          </Button>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default PasswordChangePage;
