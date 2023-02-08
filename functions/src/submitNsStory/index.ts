import * as functions from "firebase-functions";
import { SubmitNsStoryInterface } from "./interfaces/submitNsStory.interface";
import { submitNsStorySchema } from "../validationSchemas";
import { verifyRecaptcha } from "../recaptcha";
import * as admin from "firebase-admin";

const db = admin.firestore();

const submitNsStory = functions.https.onCall(
  async (request: SubmitNsStoryInterface, context) => {
    let errorCode: functions.https.FunctionsErrorCode = "unknown";
    try {
      const {
        email,
        recaptcha,
        story,
        storyPlace,
        storyPictures,
        caption,
        categoryName,
        name,
        isDonate,
        rank,
        phone,
        title,
        unit,
        videoUrl,
        audioUrl,
      } = request;
      const isParamValid = submitNsStorySchema.isValidSync(request);
      if (!isParamValid) {
        errorCode = "invalid-argument";
        throw new Error("Parameter is invalid");
      }
      await verifyRecaptcha(recaptcha, context);
      const nsStoriesCollection = db.collection("ns-stories");
      await nsStoriesCollection.add({
        email,
        story,
        storyPlace,
        storyPictures,
        caption,
        categoryName,
        name,
        isDonate,
        rank,
        phone,
        title,
        unit,
        videoUrl,
        audioUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return {
        message: "NS story is submitted successfully",
      };
    } catch (error) {
      return Promise.reject(
        new functions.https.HttpsError(errorCode, (error as Error).message)
      );
    }
  }
);

export default submitNsStory;
