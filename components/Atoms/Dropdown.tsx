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
  chakra,
} from "@chakra-ui/react";
import { useField } from "formik";

import type { FC, ReactNode } from "react";

export interface IOption {
  label: string;
  value: string;
  disabled?: boolean;
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
  topMargin?: string;
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
  topMargin = "3",
  ...props
}) => {
  const [{ value }, meta, { setValue }] = useField<string>(name);

  return (
    <VStack mt={topMargin}>
      <FormControl
        {...props}
        id={id}
        isInvalid={Boolean(meta.error && meta.touched)}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        {label && (
          <FormLabel color="brand.green" mb="0">
            {label}
          </FormLabel>
        )}
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
          <Select
            placeholder={placeholder}
            border="none"
            borderBottom="1px solid #2E4924"
            borderRadius={0}
            fontWeight="bold"
            color="brand.green"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            sx={{
              "&": {
                paddingLeft: 0,
              },
            }}
          >
            {data.map(({ label, value, disabled }) => (
              <option
                key={value}
                value={value}
                disabled={disabled}
                /* dangerouslySetInnerHTML={{
                  __html: disabled
                    ? label
                        .split("")
                        .map((char) => `${char}&#822;`)
                        .join("")
                    : label,
                }} */
              >
                {label}
              </option>
            ))}
          </Select>
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
