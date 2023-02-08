import { Stack, Text, Skeleton, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { object, array } from "yup";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useSelector, shallowEqual } from "react-redux";
import Script from "next/script";

import Button from "@/components/Atoms/Button";
import OtpInputs from "@/components/Molecules/OtpInputs";

import { requiredString } from "@/constants/validationSchema";

import { db, functions } from "@/connections/firebase";

import type { FC, SetStateAction, Dispatch } from "react";
import type { CollectionReference } from "firebase/firestore";
import type { RootState } from "@/states/store";
import type {
  IRegisterPage,
  OtpPayload,
  PageMode,
} from "@/interfaces/registration";

interface OtpForm {
  setPageMode: Dispatch<SetStateAction<PageMode>>;
}

const authPages = collection(
  db,
  "authentication-pages"
) as CollectionReference<IRegisterPage>;

const createUser = httpsCallable<RootState["register"], string>(
  functions,
  "createUser"
);

const sendEmailOtp = httpsCallable<
  { email: string; recaptchaV3: string },
  void
>(functions, "sendEmailOtp");

const VALIDATION_SCHEMA = object().shape({
  otp: array()
    .of(requiredString)
    .min(6, "OTP must contain 6 characters")
    .max(6, "OTP must contain 6 characters"),
});

const INITIAL_VALUES: OtpPayload = {
  otp: [],
};

const OtpForm: FC<OtpForm> = ({ setPageMode }) => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [isSendingEmail, setSendingEmail] = useState(false);
  const [isRecaptchaReady, setRecaptchaReady] = useState(false);
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

  return (
    <>
      <Script
        async
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY}`}
        onLoad={() => setRecaptchaReady(true)}
      />
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
          fontWeight="bold"
          dangerouslySetInnerHTML={{ __html: registerPage?.otp || "" }}
        />
      </Skeleton>
      <Formik
        validationSchema={VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={INITIAL_VALUES}
        component={OtpInputs}
        onSubmit={async ({ otp }) => {
          try {
            setLoading(true);
            const payload = { ...registerPayload, code: otp.join("") };
            await createUser(payload);
            setPageMode("success");
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
      <Stack
        w="full"
        gap="0.5rem"
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <Button
          bgColor="brand.orange"
          type="submit"
          form="otp-form"
          isLoading={isLoading}
        >
          VERIFY
        </Button>
        <Button
          bgColor="brand.green"
          disabled={isLoading || !isRecaptchaReady}
          isLoading={isSendingEmail}
          onClick={async () => {
            window.grecaptcha.ready(function () {
              window.grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY, {
                  action: "sendEmailOtp",
                })
                .then(async (token: string) => {
                  try {
                    setSendingEmail(true);
                    await sendEmailOtp({
                      email: registerPayload.email,
                      recaptchaV3: token,
                    });
                    toast({
                      title: "Email Sent",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  } catch (error: any) {
                    toast({
                      title: "Email Error",
                      description: error.message || error.error.message,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  } finally {
                    setSendingEmail(false);
                  }
                })
                .catch((error: Error) => {
                  toast({
                    title: "reCAPTCHA Error",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                });
            });
          }}
        >
          RESEND OTP
        </Button>
      </Stack>
    </>
  );
};

export default OtpForm;
