import DayPickerInput from "react-day-picker/DayPickerInput";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useField } from "formik";
import dayjs from "dayjs";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";

import type { FC } from "react";

import "react-day-picker/lib/style.css";

interface DatePickerProps {
  name: string;
  label?: string;
}

const DatePicker: FC<DatePickerProps> = ({ name, label = "" }) => {
  const [{ value }, meta, { setValue }] = useField<string>(name);

  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
      {label && <FormLabel color="brand.green">{label}</FormLabel>}
      <Box
        sx={{
          ".DayPickerInput-Overlay": {
            zIndex: 999,
          },
          ".DayPicker-Months": {
            color: "#000",
          },
        }}
      >
        <DayPickerInput
          format="DD-MM-YYYY"
          component={(props: Record<string, unknown>) => {
            return (
              <InputGroup>
                <Input
                  {...props}
                  placeholder=""
                  fontWeight="bold"
                  color="brand.green"
                  border="none"
                  borderBottom="1px solid #6BA43A"
                  borderRadius={0}
                  pl={0}
                  sx={{
                    '&[aria-invalid="true"]': {
                      boxShadow: "none",
                    },
                  }}
                />
                <InputRightElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  <FaRegCalendarAlt style={{ fill: "url(#lgrad)" }} />
                </InputRightElement>
              </InputGroup>
            );
          }}
          value={value}
          onDayChange={(date) => {
            const day = dayjs(date);
            setValue(day.format("DD-MM-YYYY"));
            // setTouched(true);
          }}
          style={{ display: "block" }}
        />
      </Box>
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
};

export default DatePicker;
