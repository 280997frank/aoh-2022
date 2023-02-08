import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  InputGroup,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "formik";

import type { ReactNode } from "react";

interface FormTextAreaProps extends TextareaProps {
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  InputRightElement?: ReactNode;
}

export default function FormTextArea({
  name,
  id,
  label,
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  InputRightElement = null,
  ...props
}: FormTextAreaProps) {
  const [field, meta, { setValue }] = useField(name);

  return (
    <FormControl
      id={id}
      isInvalid={Boolean(meta.error && meta.touched)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      {label && (
        <FormLabel color="brand.green" mb="0">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Textarea
          {...props}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          borderColor="#2E4924"
          value={field.value}
          _focus={{
            borderColor: "#2E4924",
          }}
          _hover={{
            borderColor: "#2E4924",
          }}
          fontWeight="bold"
          color="brand.green"
          paddingInlineStart={2}
          _placeholder={{
            color: "brand.green",
          }}
          sx={{
            '&[aria-invalid="true"]': {
              boxShadow: "none",
            },
          }}
        />
        {InputRightElement}
      </InputGroup>
      {description && (
        <FormHelperText textAlign="right">{description}</FormHelperText>
      )}
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
