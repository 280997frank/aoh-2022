import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { AttendeeCountDto } from "../dto/attendee-count.dto";
import { firestore } from "firebase-admin";
import FieldValue = firestore.FieldValue;
const db = admin.firestore();

const attendeeCount = functions.https.onCall(async (body: AttendeeCountDto) => {
  try {
    /* if (!context.auth) {
          throw new Error("Missing UID in context");
        } */
    // console.log(body);
    const attendee = await db
      .collection("attendee-count")
      .where("venue", "==", body.venue)
      .get();
    // console.log(attendee);
    // eslint-disable-next-line max-len
    const checkCount = body.attendee;
    // console.log(checkCount);
    let cnt = 0;
    attendee.docs.map(async (docs) => {
      // console.log(docs.data());
      cnt++;
      const data =
        body.type === "checkin"
          ? {
              // eslint-disable-next-line max-len
              // [`date.${body.date}.checkin`]: FieldValue.increment(checkCount),
              [`date.${body.date}.checkin`]: FieldValue.increment(
                body.attendee
              ),
            }
          : {
              // eslint-disable-next-line max-len
              [`date.${body.date}.checkout`]: FieldValue.increment(
                body.attendee
              ),
            };
      await db.collection("attendee-count").doc(docs.id).update(data);
    });
    if (cnt === 0) {
      const data =
        body.attendee > 0
          ? {
              date: {
                [`${body.date}`]: {
                  checkin: checkCount,
                  checkout: 0,
                },
              },
              venue: body.venue,
            }
          : {
              date: {
                [`${body.date}`]: {
                  checkin: 0,
                  checkout: checkCount,
                },
              },
              venue: body.venue,
            };
      await db.collection("attendee-count").doc().set(data);
    }
    // await Promise.all(updatedCustomers);

    return;
  } catch (error) {
    const err = error as Error;
    return Promise.reject(
      new functions.https.HttpsError("unknown", err?.message)
    );
  }
});

export default attendeeCount;
