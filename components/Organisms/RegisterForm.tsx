import {
  chakra,
  Box,
  VStack,
  HStack,
  Text,
  InputRightElement,
  IconButton,
  Skeleton,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Link from "next/link";
import { object } from "yup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { httpsCallable } from "firebase/functions";
import ReCAPTCHA from "react-google-recaptcha";
import { useField } from "formik";

import FormInput from "@/components/Atoms/FormInput";
import Button from "@/components/Atoms/Button";

import {
  requiredEmail,
  requiredName,
  requiredPassword,
  optionalName,
  requiredString,
} from "@/constants/validationSchema";

import { functions } from "@/connections/firebase";

import { useTermsAndConditions } from "@/hooks/tickets";

import { actions as registerActions } from "@/states/register/slice";

import type { FC, SetStateAction, Dispatch } from "react";
import type { FormikProps } from "formik";
import type { PageMode } from "@/interfaces/registration";
import type { RootState } from "@/states/store";

type PasswordInputType = "password" | "text";

interface RegisterFormProps {
  setPageMode: Dispatch<SetStateAction<PageMode>>;
}

interface InitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  recaptcha?: string;
}

const ChakraForm = chakra(Form);

const VALIDATION_SCHEMA = object().shape({
  firstName: requiredName,
  lastName: optionalName,
  email: requiredEmail,
  password: requiredPassword,
  recaptcha: requiredString,
});

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  recaptcha: "",
};

const sendEmailOtp = httpsCallable<{ email: string; recaptcha: string }, void>(
  functions,
  "sendEmailOtp"
);

const createUserWithoutOtp = httpsCallable<InitialValues, string>(
  functions,
  "createUserWithoutOtp"
);

const RegisterForm: FC<RegisterFormProps> = ({ setPageMode }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isAgreeToTnC, setAgreeToTnC] = useState(false);
  const [isAgreeToAdvisory, setAgreeToAdvisory] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [registerPage, loading] = useTermsAndConditions();

  useEffect(() => {
    if (registerPage) {
      setCheckboxes([registerPage.tnc, registerPage.advisory]);
    }
  }, [registerPage]);

  return (
    <>
      <Formik
        validationSchema={VALIDATION_SCHEMA}
        initialValues={INITIAL_VALUES}
        component={ActualForm}
        onSubmit={async (values) => {
          try {
            if (!isAgreeToTnC || !isAgreeToAdvisory) {
              throw new Error(
                "You must agree to the Terms & Conditions and Advisory first"
              );
            }

            setLoading(true);

            if (registerPage?.useOtp) {
              await sendEmailOtp({
                email: values.email.toLowerCase(),
                recaptcha: values.recaptcha || "",
              });
              delete values.recaptcha;
              dispatch(registerActions.setPayload(values));
              setPageMode("otp");
            } else {
              await createUserWithoutOtp({
                ...values,
                email: values.email.toLowerCase(),
              });
              dispatch(registerActions.setPayload(values));
              setPageMode("success");
            }
          } catch (error: any) {
            setLoading(false);
            toast({
              title: "Register Error",
              description: error.message || error.error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }}
      />
      <HStack
        m={{
          base: "1.5rem 0 1rem !important",
        }}
        justifyContent="center"
      >
        {/* <Box
          id="g-recaptcha"
          /* className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          data-callback="onSuccessfulReCaptcha"
          data-expired-callback="onExpiredReCaptcha"
          data-error-callback="onErrorReCaptcha" *
        /> */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onChange={window.onSuccessfulReCaptcha}
          onExpired={window.onExpiredReCaptcha}
          onErrored={window.onErrorReCaptcha}
        />
      </HStack>
      <VStack
        gap={0}
        m={{
          base: "1.5rem 0 1rem !important",
        }}
      >
        {checkboxes.map((checkbox, index) => {
          let isAgree = index === 0 ? isAgreeToTnC : isAgreeToAdvisory;
          let setAgree = index === 0 ? setAgreeToTnC : setAgreeToAdvisory;

          return (
            <HStack
              key={checkbox}
              w="full"
              /* m={{
              base: "1.5rem 0 1rem !important",
            }} */
            >
              <Checkbox
                alignItems="flex-start"
                iconColor="brand.orange"
                size="md"
                sx={{
                  "& .chakra-checkbox__control": {
                    background: "white !important",
                    borderColor: "white !important",
                    borderRadius: "base",
                  },
                }}
                isChecked={isAgree}
                onChange={() => {
                  setAgree(!isAgree);
                }}
              >
                <Skeleton isLoaded={!loading}>
                  <Text
                    as="span"
                    color="brand.green"
                    lineHeight={{
                      base: "1rem",
                      md: "1.375rem",
                    }}
                    fontSize={{
                      base: "xs",
                      md: "md",
                    }}
                    dangerouslySetInnerHTML={{ __html: checkbox }}
                  />
                </Skeleton>
              </Checkbox>
            </HStack>
          );
        })}
      </VStack>
      <VStack w="full" gap="0.5rem">
        <Button
          bgColor="brand.orange"
          type="submit"
          form="register-form"
          disabled={!isAgreeToTnC || !isAgreeToAdvisory}
          isLoading={isLoading}
        >
          REGISTER
        </Button>
        <Text color="brand.green" lineHeight="1.375rem">
          Or if you already have an account:
        </Text>
        <Link href="/login" passHref>
          <Button as="a" bgColor="brand.green" disabled={isLoading}>
            LOGIN
          </Button>
        </Link>
      </VStack>
    </>
  );
};

const ActualForm: FC<FormikProps<InitialValues>> = () => {
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>("password");
  const [, , { setValue }] = useField("recaptcha");

  useEffect(() => {
    window.onSuccessfulReCaptcha = (token) => {
      setValue(token);
    };

    window.onExpiredReCaptcha = () => {
      setValue("");
    };
  }, [setValue]);

  return (
    <ChakraForm w="full" d="flex" flexDir="column" gap={6} id="register-form">
      <HStack gap={2} alignItems="stretch">
        <FormInput
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />
        <FormInput
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
        />
      </HStack>
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
                  passwordInputType === "password" ? "text" : "password"
                );
              }}
            />
          </InputRightElement>
        }
      />
    </ChakraForm>
  );
};

export default RegisterForm;
