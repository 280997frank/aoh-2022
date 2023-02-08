import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { firestore } from "firebase-admin";
import FieldValue = firestore.FieldValue;
import { InvitedCheckinDto } from "../dto/invited-checkin.dto";
import * as dayjs from "dayjs";
const db = admin.firestore();

const invitedCheckin = functions.https.onCall(
  async (body: InvitedCheckinDto) => {
    try {
      const today = dayjs().tz("Asia/Singapore").format("DD-MM-YYYY");
      // const ticketId = body.ticketId;
      const checkLImit = await db
        .collection("mod-tour")
        .doc(body.ticketId)
        .get()
        .then((docs) => {
          return docs.data();
        });
      if (!checkLImit) {
        return Promise.reject(
          new functions.https.HttpsError("unknown", "ticket not found!")
        );
      }
      if (checkLImit.limit < 1) {
        return Promise.reject(
          new functions.https.HttpsError("unknown", "limit quota exceed!")
        );
      }

      await db
        .collection("mod-tour")
        .doc(body.ticketId)
        .update({
          limit: FieldValue.increment(-1),
        });

      await db
        .collection("mod-tour")
        .doc(body.ticketId)
        .collection("checkin")
        .doc()
        .set({
          timestamp: new Date(),
          venueName: body.venue,
        });

      const attendee = await db
        .collection("attendee-count")
        .where("venue", "==", body.venue)
        .get();

      let cnt = 0;
      attendee.docs.map(async (docs) => {
        // console.log(docs.data());
        cnt++;
        const data = {
          [`date.${today}.checkin`]: FieldValue.increment(1),
        };

        await db.collection("attendee-count").doc(docs.id).update(data);
      });
      if (cnt === 0) {
        const data = {
          date: {
            [`${today}`]: {
              checkin: 1,
              checkout: 0,
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
  }
);

export default invitedCheckin;
