import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { CreateUserWithoutOtp } from "./interfaces/createUserWithoutOtp.interface";
import { createUserWithoutOtpSchema } from "../validationSchemas";
import { RoleType } from "../types/role.type";
import { verifyRecaptcha } from "../recaptcha";

const db = admin.firestore();
const createUserWithoutOtp = functions.https.onCall(
  async (request: CreateUserWithoutOtp, context) => {
    let errorCode: functions.https.FunctionsErrorCode = "unknown";

    try {
      const isParamValid = createUserWithoutOtpSchema.isValidSync(request);

      if (!isParamValid) {
        errorCode = "invalid-argument";
        throw new Error("Parameter is invalid");
      }

      await verifyRecaptcha(request.recaptcha, context);

      const {
        email,
        password,
        firstName,
        lastName = "",
        role = RoleType.USER,
      } = request;
      const userCollection = db.collection("users");
      const checkEmailExist = await userCollection
        .where("email", "==", email)
        .get();
      checkEmailExist.docs.forEach((doc) => {
        if (doc.exists) {
          throw new Error("Email already exist");
        }
      });

      const res = await admin.auth().createUser({
        email,
        password,
        emailVerified: true,
        displayName: `${firstName} ${lastName}`.trim(),
      });

      await userCollection.doc(res.uid).set({
        email,
        firstName,
        lastName,
        role,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return "User created successfully";
    } catch (error: unknown) {
      const err = error as Error;
      return Promise.reject(
        new functions.https.HttpsError(
          errorCode,
          err.message || "Something went wrong"
        )
      );
    }
  }
);

export default createUserWithoutOtp;
