import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
const radeemTracker = functions.firestore
  .document("/leaderboards/{id}")
  .onUpdate(async (change) => {
    try {
      const newValue = change.after.data();
      if (newValue.redeemStatus) {
        const trackingsCollection = db.collection("trackings");
        await trackingsCollection.add({
          event: "click",
          type: "redeem",
          data: {
            date: newValue.date,
            email: newValue.email,
            firstName: newValue.firstName,
            gameName: newValue.gameName,
            lastName: newValue.lastName,
            redeemStatus: newValue.redeemStatus,
            score: newValue.score,
          },
          timestamps: new Date(),
        });
      }

      return {
        error: "",
        content: newValue,
      };
    } catch (error) {
      const err = error as Error;
      return Promise.reject(
        new functions.https.HttpsError("unknown", err?.message)
      );
    }
  });

export default radeemTracker;
