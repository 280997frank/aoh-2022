import { object } from "yup";
import { Formik, Form, useField } from "formik";
import { chakra, useToast } from "@chakra-ui/react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { httpsCallable } from "firebase/functions";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// import DatePicker from "@/components/Atoms/DatePicker";
import Dropdown from "@/components/Atoms/Dropdown";

import { requiredString, requiredNumber } from "@/constants/validationSchema";

import { useTimeSlot, useAvailableDates } from "@/hooks/tickets";

import { functions } from "@/connections/firebase";

import type { FC, Dispatch, SetStateAction } from "react";
import type { FormikProps } from "formik";
import { useBookingTracking } from "@/hooks/trackings";

interface InitialValues {
  date: string;
  time: string;
  pax: number;
  recaptcha: string;
  venueId: string;
}

const VALIDATION_SCHEMA = object().shape({
  date: requiredString,
  time: requiredString,
  pax: requiredNumber,
  recaptcha: requiredString,
  venueId: requiredString,
});

dayjs.extend(isSameOrBefore);

const ChakraForm = chakra(Form);
const DownwardTriangle = <TiArrowSortedDown style={{ fill: "url(#lgrad)" }} />;

const ActualForm: FC<FormikProps<InitialValues>> = ({
  values,
  setFieldValue,
}) => {
  const router = useRouter();
  const { venueId } = router.query;
  const [, , { setValue }] = useField("recaptcha");
  const [timeSlots, isFetchingTimeSlots] = useTimeSlot(
    typeof venueId === "string" ? venueId : "",
    values.date
  );
  const [availableDates, isFetchingAvailableDates] = useAvailableDates(
    typeof venueId === "string" ? venueId : ""
  );

  useEffect(() => {
    window.onSuccessfulReCaptcha = (token) => {
      setValue(token);
    };

    window.onExpiredReCaptcha = () => {
      setValue("");
    };
  }, [setValue]);

  useEffect(() => {
    setFieldValue("time", "");
  }, [setFieldValue, values.date]);

  return (
    <ChakraForm w="full" d="flex" flexDir="column" gap={4} id="booking-form">
      {/* <DatePicker name="date" label="Select date" /> */}
      <Dropdown
        name="date"
        id="date"
        label="Select date"
        placeholder={isFetchingAvailableDates ? "Loading" : "-"}
        RightElement={DownwardTriangle}
        data={availableDates}
      />
      <Dropdown
        name="time"
        id="time"
        label="Select time slot"
        placeholder={isFetchingTimeSlots ? "Loading" : "-"}
        RightElement={DownwardTriangle}
        data={timeSlots
          .map(({ time, onlineQuota }) => ({
            label: time,
            value: time,
            disabled: onlineQuota < 1,
          }))
          .filter(({ value }) => {
            const startTime = value;
            const startTimeDate = dayjs(
              `${values.date} ${startTime}`,
              "DD-MM-YYYY HH:mm"
            );
            const now = dayjs();
            const isStillTheTime = now.isSameOrBefore(startTimeDate, "hour");

            return isStillTheTime;
          })}
      />
      <Dropdown
        name="pax"
        id="pax"
        label="Number of pax"
        placeholder="-"
        RightElement={DownwardTriangle}
        data={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />
    </ChakraForm>
  );
};

interface BookingFormProps {
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
  venue: string;
  title: string;
}

const bookOnlineTicket = httpsCallable<InitialValues, { ticketId: string }>(
  functions,
  "bookOnlineTicket"
);

const BookingForm: FC<BookingFormProps> = ({
  setSubmitting,
  isSubmitting,
  venue,
  title,
}) => {
  const toast = useToast();
  const router = useRouter();
  const [data, setData] = useState({
    date: "",
    pax: 0,
    time: "",
  });
  const { venueId } = router.query;
  const INITIAL_VALUES = {
    date: "",
    time: "",
    pax: 0,
    recaptcha: "",
    venueId,
  };

  useBookingTracking({
    data: {
      ...data,
      vanue: venue,
      title: title,
    },
    isClicked: isSubmitting,
    type: "booking",
  });

  return (
    <Formik
      enableReinitialize
      validationSchema={VALIDATION_SCHEMA}
      initialValues={INITIAL_VALUES}
      component={ActualForm}
      onSubmit={async (values) => {
        try {
          setSubmitting(true);
          values.pax = Number(values.pax);
          values.time = values.time.replace(/\./g, ":");
          await bookOnlineTicket(values as InitialValues);

          setData({
            date: values.date,
            pax: values.pax,
            time: values.time,
          });
          toast({
            title: "Booking Successful",
            description: "Please check your email inbox",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            router.push("/my-tickets");
          }, 1000);
        } catch (error: any) {
          toast({
            title: "Booking Error",
            description: error.message || error.error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setData({
            date: "",
            pax: 0,
            time: "",
          });
          setSubmitting(false);
        }
      }}
    />
  );
};

export default BookingForm;
