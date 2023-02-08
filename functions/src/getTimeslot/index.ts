import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { TimeslotInputDto } from "../dto/timeslot-input.dto";
import { TimeslotResponseDto } from "../dto/timeslot-response.dto";
const db = admin.firestore();

const getTimeslot = functions.https.onCall(async (body: TimeslotInputDto) => {
  try {
    return await db
      .collection("timeslots")
      .doc(body.timeslotId)
      .collection("dates")
      .doc(body.date)
      .collection("times")
      .get()
      .then((doc) => {
        const res: TimeslotResponseDto[] = [];
        doc.docs.map((data) => {
          const x = data.data();
          x.id = data.id;
          res.push({
            id: data.id,
            sequence: x.sequence,
            time: x.time,
            offlineQuota: x.offlineQuota,
            onlineQuota: x.onlineQuota,
          });
        });
        return res;
      });
  } catch (error) {
    const err = error as Error;
    return Promise.reject(
      new functions.https.HttpsError("unknown", err?.message)
    );
  }
});

export default getTimeslot;
