import { useToast } from "@chakra-ui/react";
import { useDocumentData, useCollection } from "react-firehooks/firestore";
import {
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { db } from "@/connections/firebase";

import type { CollectionReference, QuerySnapshot } from "firebase/firestore";
import type { TimeSlot, HourlyData } from "@/interfaces/tickets";
import type { IRegisterPage } from "@/interfaces/registration";
import type { IOption } from "@/components/Atoms/Dropdown";

dayjs.extend(customParseFormat);

const options = {
  snapshotListenOptions: {
    includeMetadataChanges: true,
  },
};

const timeslotsRef = collection(
  db,
  "timeslots"
) as CollectionReference<TimeSlot>;

export function useVenueDetail(
  venueId: string
): [TimeSlot | undefined, boolean] {
  const toast = useToast();
  const [venueDetail, loading, error] = useDocumentData(
    doc(timeslotsRef, venueId),
    options
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

  return [venueDetail, loading];
}

const authPages = collection(
  db,
  "authentication-pages"
) as CollectionReference<IRegisterPage>;

export function useTermsAndConditions(): [IRegisterPage | undefined, boolean] {
  const toast = useToast();
  const [registerPage, loading, error] = useDocumentData(
    doc(authPages, "register"),
    options
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

  return [registerPage, loading];
}

interface DailyTimeSlot {
  offlineQuota: number;
  onlineQuota: number;
  sequence: number;
  time: string;
}

interface DailyTimeSlotWithId extends DailyTimeSlot {
  id: string;
}

export function useTimeSlot(
  venueId: string,
  date: string
): [DailyTimeSlotWithId[], boolean] {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<DailyTimeSlotWithId[]>([]);

  useEffect(() => {
    function setSnapshotToTimeSlots(snapshot: QuerySnapshot<DailyTimeSlot>) {
      const timeSlotlist: DailyTimeSlotWithId[] = [];
      snapshot.forEach((doc) => {
        timeSlotlist.push({ id: doc.id, ...doc.data() });
      });
      setTimeSlots(timeSlotlist);
      setLoading(false);
    }

    if (date && venueId) {
      setLoading(true);
      const dailyTimeSlotRef = collection(
        db,
        "timeslots",
        venueId,
        "dates",
        date,
        "times"
      ) as CollectionReference<DailyTimeSlot>;

      const q = query(dailyTimeSlotRef, orderBy("sequence", "asc"));

      /* getDocs(q)
        .then(snapshot => {
          const timeSlotlist: DailyTimeSlotWithId[] = [];
          snapshot.forEach((doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(123, source, " data: ", doc.data());
            timeSlotlist.push({ id: doc.id, ...doc.data() });
          });
          setTimeSlots(timeSlotlist);
        })
        .catch((error) => {
          toast({
            title: "Time Slot Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        }); */

      const unsub = onSnapshot(q, setSnapshotToTimeSlots, (error) => {
        toast({
          title: "Time Slot Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });

      return unsub;
    }
  }, [date, venueId, toast]);

  return [timeSlots, loading];
}

export function useAvailableDates(venueId: string): [IOption[], boolean] {
  const toast = useToast();
  const availableDatesRef = collection(
    db,
    "timeslots",
    typeof venueId === "string" ? venueId : "",
    "dates"
  );

  const [availableDates, setAvailableDates] = useState<IOption[]>([]);
  const [availableDates_, loading, error] = useCollection(availableDatesRef, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  useEffect(() => {
    if (availableDates_) {
      // const list: IOption[] = [];

      const promises = availableDates_.docs.map(async (doc) => {
        const availableTimeSlotsRef = collection(
          db,
          "timeslots",
          venueId,
          "dates",
          doc.id,
          "times"
        ) as CollectionReference<HourlyData>;
        const querySnapshot = await getDocs(availableTimeSlotsRef);
        const todaySlots: HourlyData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          todaySlots.push(data);
        });
        const now = dayjs();
        const isThereRemainingTimeSlotToday = todaySlots.some((slot) => {
          return (
            now.isBefore(
              dayjs(`${doc.id} ${slot.time}`, "DD-MM-YYYY HH:mm"),
              "hour"
            ) && slot.onlineQuota > 0
          );
        });

        return {
          label: dayjs(doc.id, "DD-MM-YYYY").format("DD MMM YYYY"),
          value: doc.id,
          disabled: !isThereRemainingTimeSlotToday,
        };
      });

      Promise.all(promises)
        .then((values) => {
          // const nonNullValues = values.filter((value) => value);
          setAvailableDates(values);
        })
        .catch((error) => {
          toast({
            title: "Time Slot Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
      /* availableDates_.forEach((doc) => {
        list.push({
          label: dayjs(doc.id, "DD-MM-YYYY").format("DD MMM YYYY"),
          value: doc.id,
        });
      }); 
      setAvailableDates(list); */
    }
  }, [availableDates_, venueId, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Time Slot Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast, error]);

  return [availableDates, loading];
}
