import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControlProps,
  VStack,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

import type { FC, ReactNode } from "react";

export interface IOption {
  label: string;
  value: string;
}

interface TextInputProps extends FormControlProps {
  name: string;
  id: string;
  label?: string;
  data?: IOption[];
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
}

const DropDown: FC<TextInputProps> = ({
  name,
  id,
  label = "",
  data = [],
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  LeftElement = null,
  RightElement = null,
  ...props
}) => {
  const [{ value }, meta, { setValue }] = useField<string>(name);

  return (
    <VStack my="3">
      <FormControl
        {...props}
        id={id}
        isInvalid={Boolean(meta.error && meta.touched)}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        {label && <FormLabel color="brand.green">{label}</FormLabel>}
        <InputGroup>
          {LeftElement && (
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              {LeftElement}
            </InputLeftElement>
          )}
          <RadioGroup
            justifyContent="flex-start"
            role="group"
            aria-labelledby="my-radio-group"
            onChange={setValue}
            value={value}
            defaultValue="1"
          >
            <Stack
              direction="row"
              spacing={5}
              fontWeight="bold"
              color="brand.green"
            >
              <Radio name={name} value="1" borderColor="brand.orange">
                Yes
              </Radio>
              <Radio name={name} value="0" borderColor="brand.orange">
                No
              </Radio>
            </Stack>
          </RadioGroup>
          {RightElement && (
            <InputRightElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              {RightElement}
            </InputRightElement>
          )}
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
    </VStack>
  );
};

export default DropDown;
