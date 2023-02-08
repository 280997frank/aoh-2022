import { useEffect, useRef } from "react";
import { chakra, HStack, Text } from "@chakra-ui/react";
import { Form, useField } from "formik";

import OtpInput from "@/components/Atoms/OtpInput";

import type { FC } from "react";
import type { FormikProps } from "formik";
import type { OtpPayload } from "@/interfaces/registration";

const ChakraForm = chakra(Form);

const OtpInputs: FC<FormikProps<OtpPayload>> = ({ values, submitForm }) => {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);
  const inputRef6 = useRef<HTMLInputElement>(null);
  const [, meta] = useField("otp");

  useEffect(() => {
    inputRef1.current?.focus();
  }, []);

  useEffect(() => {
    if (values.otp[0]) {
      inputRef2.current?.focus();
    }

    if (values.otp[1]) {
      inputRef3.current?.focus();
    }

    if (values.otp[2]) {
      inputRef4.current?.focus();
    }

    if (values.otp[3]) {
      inputRef5.current?.focus();
    }

    if (values.otp[4]) {
      inputRef6.current?.focus();
    }

    if (values.otp[5]) {
      submitForm();
    }
  }, [submitForm, values.otp]);

  return (
    <ChakraForm w="full" d="flex" flexDir="column" gap={2} id="otp-form" my={8}>
      <HStack alignItems="stretch">
        <OtpInput id="otp.0" name="otp.0" ref={inputRef1} />
        <OtpInput id="otp.1" name="otp.1" ref={inputRef2} />
        <OtpInput id="otp.2" name="otp.2" ref={inputRef3} />
        <OtpInput id="otp.3" name="otp.3" ref={inputRef4} />
        <OtpInput id="otp.4" name="otp.4" ref={inputRef5} />
        <OtpInput id="otp.5" name="otp.5" ref={inputRef6} />
      </HStack>
      <Text
        as="span"
        justifyContent="flex-end"
        color="brand.orange"
        textAlign="right"
        fontSize={{
          base: "xs",
          md: "md",
        }}
      >
        {meta.error}
      </Text>
    </ChakraForm>
  );
};

export default OtpInputs;
