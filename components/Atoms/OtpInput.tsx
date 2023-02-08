import {
  FormControl,
  FormErrorMessage,
  Input,
  forwardRef,
} from "@chakra-ui/react";
import { useField } from "formik";

import type { InputProps } from "@chakra-ui/react";

interface OtpInputProps extends InputProps {
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const OtpInput = forwardRef<OtpInputProps, "input">(
  (
    {
      name,
      id,
      type = "tel",
      placeholder = "",
      isDisabled = false,
      isReadOnly = false,
    },
    ref
  ) => {
    const [, meta, { setValue }] = useField(name);

    return (
      <FormControl
        id={id}
        isInvalid={Boolean(meta.error && meta.touched)}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
      >
        <Input
          ref={ref}
          type={type}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          border="none"
          borderRadius="lg"
          fontWeight="bold"
          fontSize="5xl"
          h="6.125rem"
          p={0}
          textAlign="center"
          bgColor="white"
          color="brand.green"
          maxLength={1}
          _placeholder={{
            color: "brand.green",
          }}
        />
        <FormErrorMessage
          justifyContent="flex-end"
          color="brand.orange"
          fontSize={{
            base: "xs",
            md: "md",
          }}
        >
          {meta.error}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

export default OtpInput;
