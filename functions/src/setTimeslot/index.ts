import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { SetTimeslotInputDto } from "../dto/set-timeslot-input.dto";
import { firestore } from "firebase-admin";
import FieldValue = firestore.FieldValue;
const db = admin.firestore();

const setTimeslot = functions.https.onCall(
  async (body: SetTimeslotInputDto) => {
    try {
      const check = await db
        .collection("timeslots")
        .doc(body.timeslotId)
        .collection("dates")
        .doc(body.date)
        .collection("times")
        .doc(body.timeslotTimeId)
        .get()
        .then((doc) => {
          return doc.data();
        });
      if (!check || check["offlineQuota"] === 0) {
        return {
          error: "limit quota exceed",
          content: check,
        };
      }
      return await db
        .collection("timeslots")
        .doc(body.timeslotId)
        .collection("dates")
        .doc(body.date)
        .collection("times")
        .doc(body.timeslotTimeId)
        .update({
          offlineQuota: FieldValue.increment(body.offlineQuota),
        })
        .then(async () => {
          const get = await db
            .collection("timeslots")
            .doc(body.timeslotId)
            .collection("dates")
            .doc(body.date)
            .collection("times")
            .doc(body.timeslotTimeId)
            .get()
            .then((doc) => {
              return doc.data();
            });
          return {
            error: "",
            content: get,
          };
        });
    } catch (error) {
      const err = error as Error;
      return Promise.reject(
        new functions.https.HttpsError("unknown", err?.message)
      );
    }
  }
);

export default setTimeslot;
