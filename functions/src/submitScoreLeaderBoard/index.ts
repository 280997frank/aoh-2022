import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";
import { submitScoreLeaderBoardSchema } from "../validationSchemas";
import { verifyRecaptchaV3 } from "../recaptcha";
import { decryptText } from "./helpers";

const db = admin.firestore();
const submitScoreLeaderBoard = functions.https.onCall(
  async (request_, context) => {
    let errorCode: functions.https.FunctionsErrorCode = "unknown";

    try {
      const isParamValid = submitScoreLeaderBoardSchema.isValidSync(request_);

      if (!isParamValid) {
        errorCode = "invalid-argument";
        throw new Error("Parameter is invalid");
      }

      await verifyRecaptchaV3(
        request_.recaptcha,
        context,
        "submitScoreLeaderBoard"
      );

      const request = decryptText(Buffer.from(request_.data, "base64"));

      const leaderBoardCollection = db.collection("leaderboards");
      await leaderBoardCollection.add({
        firstName: request.firstName,
        lastName: request.lastName || "",
        gameName: request.gameName,
        email: request.email,
        score: request.score,
        redeemStatus: false,
        date: dayjs().tz("Asia/Singapore").format("DD-MM-YYYY"),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        message: "Score submitted successfully",
      };
    } catch (error) {
      return Promise.reject(
        new functions.https.HttpsError(errorCode, (error as Error).message)
      );
    }
  }
);

export default submitScoreLeaderBoard;
