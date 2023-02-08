import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";
import { CreateUser } from "./interfaces/createUser.interface";
import { createUserSchema } from "../validationSchemas";
import { RoleType } from "../types/role.type";

const db = admin.firestore();
const createUser = functions.https.onCall(async (request: CreateUser) => {
  let errorCode: functions.https.FunctionsErrorCode = "unknown";

  try {
    const isParamValid = createUserSchema.isValidSync(request);

    if (!isParamValid) {
      errorCode = "invalid-argument";
      throw new Error("Parameter is invalid");
    }

    const {
      email,
      password,
      firstName,
      lastName = "",
      role = RoleType.USER,
      code,
    } = request;
    const otpCollection = db.collection("otp");
    const userCollection = db.collection("users");
    const checkEmailExist = await userCollection
      .where("email", "==", email)
      .get();
    checkEmailExist.docs.forEach((doc) => {
      if (doc.exists) {
        throw new Error("Email already exist");
      }
    });
    const getOtpByEmail = await otpCollection.where("email", "==", email).get();
    let otp: FirebaseFirestore.DocumentData | undefined;
    getOtpByEmail.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      const expiredAt = data.expiredAt.toDate();
      if (expiredAt < dayjs().toDate()) {
        throw new Error("OTP has expired");
      }
      otp = data;
    });
    if (!otp) {
      throw new Error(
        "OTP is invalid. Please check the OTP on the email again."
      );
    }
    if (otp?.code !== code) {
      throw new Error(
        "OTP is invalid. Please check the OTP on the email again."
      );
    }

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
});

export default createUser;
