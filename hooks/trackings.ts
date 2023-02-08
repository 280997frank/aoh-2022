import { db } from "@/connections/firebase";
import { OnBookingPayloadType, OnClickPayloadType } from "@/types/trackings";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "shortid";
import { RootState } from "@/states/store";
import { getSessionId, LOGIN_ID } from "../utils";
dayjs.extend(duration);

const VISITOR_ID = "aoh2022-visitor-id";

type TUser = {
  firstName: string;
  lastName: string;
  email: string;
};

export function useGetUser() {
  const [user, setUser] = useState<TUser>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { email, firstName, lastName } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    setUser({ firstName, lastName, email });
  }, [firstName, lastName, email]);

  return user;
}

export const useVisitorId = (): string => {
  const [visitorId, setVisitorId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem(VISITOR_ID);

    if (id === null) {
      const newId = s.generate() + s.generate();
      localStorage.setItem(VISITOR_ID, newId);
      setVisitorId(newId);
    } else {
      setVisitorId(id);
    }
  }, []);

  return visitorId;
};

export function useOnClickTracking({
  data,
  isClicked,
  type,
  page = "",
  isReady = false,
  shouldWaitForOther = false,
}: OnClickPayloadType) {
  const dispatch = useDispatch();
  const sessionID = useVisitorId();
  const [isSsrDone, setSsrDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSsrDone(true);
  }, []);

  useEffect(() => {
    const saveTracking = () => {
      addDoc(collection(db, "trackings"), {
        event: "click",
        type: type,
        data: data,
        page: page && page !== "" ? router.asPath : page,
        sessionID: sessionID,
        timestamps: new Date(),
      });

      // console.log({
      //   event: "click",
      //   type: type,
      //   data: data,
      //   page: page ? page : router.asPath,
      //   sessionID: sessionID,
      //   timestamps: new Date(),
      // });
    };

    if (shouldWaitForOther) {
      if (isSsrDone && isClicked && isReady) {
        saveTracking();
      }
    } else {
      if (isSsrDone && isClicked) {
        saveTracking();
      }
    }
  }, [
    dispatch,
    isClicked,
    isSsrDone,
    router,
    type,
    data,
    sessionID,
    shouldWaitForOther,
    isReady,
    page,
  ]);
}

export function useBookingTracking({
  data,
  isClicked,
  type,
}: OnBookingPayloadType) {
  const dispatch = useDispatch();
  const sessionID = useVisitorId();
  const [isSsrDone, setSsrDone] = useState(false);
  const router = useRouter();
  const user = useGetUser();

  useEffect(() => {
    setSsrDone(true);
  }, []);

  useEffect(() => {
    if (isSsrDone && isClicked && data.date !== "") {
      addDoc(collection(db, "trackings"), {
        event: "booking",
        type: type,
        data: data,
        user: user,
        page: router.asPath,
        sessionID: sessionID,
        timestamps: new Date(),
      });
    }
  }, [dispatch, isClicked, isSsrDone, router, type, data, sessionID, user]);
}

export function useLogin(state: boolean) {
  const [entryTime, setEntryTime] = useState<Date | null>(null);
  const [isSsrDone, setSsrDone] = useState(false);
  const dispatch = useDispatch();
  const user = useGetUser();

  useEffect(() => {
    setEntryTime(new Date());
    setSsrDone(true);
  }, []);

  useEffect(() => {
    if (entryTime && isSsrDone && state) {
      const startTime = dayjs(entryTime);
      addDoc(collection(db, "trackings"), {
        timestamps: startTime.toDate(),
        user: user,
        loginTime: startTime.toDate(),
        type: "login",
        status: "login",
      }).then((item) => {
        getSessionId(item.id);
      });
    }
  }, [dispatch, entryTime, isSsrDone, state, user]);
}

export function useLogout(state: boolean) {
  const sessionId = getSessionId("");
  useEffect(() => {
    if (state && sessionId) {
      const trackingRef = doc(db, "trackings", sessionId);
      const trackingSnap = getDoc(trackingRef);
      trackingSnap.then((result) => {
        if (result.exists()) {
          const data = result.data();
          const loginTime = dayjs.unix(data.loginTime.seconds);
          const logoutTime = dayjs(new Date());
          const duration = dayjs.duration(logoutTime.diff(loginTime));
          updateDoc(trackingRef, {
            ...data,
            logoutTime: logoutTime.toDate(),
            status: "logout",
            seconds: duration.asSeconds(),
          }).then(() => {
            localStorage.removeItem(LOGIN_ID);
          });
        }
      });
    }
  }, [state, sessionId]);
}
