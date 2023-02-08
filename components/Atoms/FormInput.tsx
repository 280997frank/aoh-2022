import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  InputGroup,
  FormControlProps,
} from "@chakra-ui/react";
import { useField } from "formik";

import type { ReactNode } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions as placeholderAction } from "@/states/placeholder/slice";

interface FormInputProps extends FormControlProps {
  name: string;
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  InputRightElement?: ReactNode;
}

export default function FormInput({
  name,
  id,
  label,
  type = "text",
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  InputRightElement = null,
  ...props
}: FormInputProps) {
  const dispatch = useDispatch();
  const [field, meta, { setValue }] = useField(name);

  return (
    <FormControl
      {...props}
      id={id}
      isInvalid={Boolean(meta.error && meta.touched)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      /* sx={{
        "& .chakra-form__label": {
          marginBottom: 0,
        },
      }} */
    >
      {label && (
        <FormLabel color="brand.green" mb="0">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          type={type}
          onChange={(e) => setValue(e.target.value)}
          value={field.value}
          placeholder={placeholder}
          border="none"
          borderBottom="1px solid #2E4924"
          borderRadius="none"
          fontWeight="bold"
          color="brand.green"
          paddingInlineStart={0}
          onFocus={() => {
            dispatch(placeholderAction.setStream(true));
          }}
          onBlur={() => {
            if (name === "password") {
              dispatch(placeholderAction.setStream(true));
            } else {
              dispatch(placeholderAction.setStream(false));
            }
          }}
          _placeholder={{
            color: "brand.green",
          }}
          _focus={{
            "&::-webkit-input-placeholder": {
              color: "transparent !important",
            },
            "&::-moz-placeholder": {
              color: "transparent !important",
            },
            "&::placeholder": {
              color: "transparent !important",
            },
            "&::-ms-input-placeholder": {
              color: "transparent !important",
            },
          }}
          sx={{
            '&[aria-invalid="true"]': {
              boxShadow: "none",
            },
            "&::-ms-input-placeholder": {
              color: "transparent",
            },
          }}
          _after={{
            "&::-webkit-input-placeholder": {
              color: "transparent !important",
            },
            "&::-moz-placeholder": {
              color: "transparent !important",
            },
            "&::placeholder": {
              color: "transparent !important",
            },
            "&::-ms-input-placeholder": {
              color: "transparent !important",
            },
          }}
        />
        {InputRightElement}
      </InputGroup>
      {description && <FormHelperText>{description}</FormHelperText>}
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
