import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import {
  addDoc,
  getDocs,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import dayjs from "dayjs";

import { auth, db } from "@/connections/firebase";

import type { CollectionReference } from "firebase/firestore";

export async function handleResetPassword(
  oobCode: string,
  newPassword: string
) {
  try {
    await verifyPasswordResetCode(auth, oobCode);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      console.info(
        "Password reset has been confirmed and new password updated."
      );
    } catch (error) {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
      throw new Error(
        "The code might have expired or the password is too weak"
      );
    }
  } catch (error) {
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
    throw new Error("Invalid or expired action code");
  }
}

interface FailedLoginAttempt {
  timestamp: {
    seconds: number;
  };
  email: string;
  attempt: number;
}

const failedLoginAttempts = collection(
  db,
  "failed-login-attempts"
) as CollectionReference<FailedLoginAttempt>;

export async function saveFailedLoginAttempt(email: string) {
  try {
    // Get attempts in the last 10 minutes
    let lastAttempt = 0;
    const q = query(
      failedLoginAttempts,
      where("timestamp", "<=", dayjs().toDate()),
      where("timestamp", ">=", dayjs().subtract(15, "minutes").toDate()),
      orderBy("attempt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      lastAttempt = doc.data().attempt;
    });

    await addDoc(failedLoginAttempts, {
      timestamp: serverTimestamp(),
      email,
      attempt: lastAttempt + 1,
    });
  } catch (error) {
    console.error("saveFailedLoginAttempt\n" + (error as Error).message);
  }
}
