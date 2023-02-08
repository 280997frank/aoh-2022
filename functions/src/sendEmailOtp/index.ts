import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as dayjs from "dayjs";

// import { RequestOtpPayload } from "./interfaces";
import { verifyRecaptcha, verifyRecaptchaV3 } from "../recaptcha";
import { requestOtpSchema } from "../validationSchemas";

const { user, port, password, secure, host } = functions.config().email;

const sendEmailOtp = functions.https.onCall(async (request, context) => {
  let errorCode: functions.https.FunctionsErrorCode = "unknown";
  try {
    const isParamValid = requestOtpSchema.isValidSync(request);

    if (!isParamValid) {
      errorCode = "invalid-argument";
      throw new Error("Parameter is invalid");
    }

    const { email, recaptcha, recaptchaV3 } = request;

    if (recaptcha) {
      await verifyRecaptcha(recaptcha, context);
    } else if (recaptchaV3) {
      await verifyRecaptchaV3(recaptchaV3, context, "sendEmailOtp");
    } else {
      errorCode = "invalid-argument";
      throw new Error("Missing reCAPTCHA");
    }

    let needSendOtp = true;
    const userQuery = await admin
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    userQuery.docs.map((snap) => {
      if (snap.data()) {
        needSendOtp = false;
      }
    });

    if (needSendOtp) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass: password,
        },
      });
      /* eslint-disable */
      const code = String(Math.floor(100000 + Math.random() * 900000));
      const expiredAt: Date = dayjs()
        .tz("Asia/Singapore")
        .add(6, "hours")
        .toDate();

      await transporter.sendMail({
        from: `"Army Open House" <${user}>`,
        to: email,
        subject: "Verification: One-Time Password for AOH22",
        html: `<div class="c16">
    <p class="c4"><span class="c7">Dear Sir/Madam,<br><br>Thank you for registering for AOH22. Below is your One–Time Password (OTP) for verification.<br></span><span
            class="c12">${code}</span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); 
                -webkit-transform: rotate(0.00rad) translateZ(0px); width: 621.27px; height: 1.33px;"><img alt=""
                src="https://docs.google.com/drawings/d/sgDe302jBsC76mvOWKAKgZw/image?parent=e/2PACX-1vQHPKs76exoqHnn5tY0aBpwMtakCCO-mt-QfX6ouKAtvlGW-UMZxGhVvobITnSdWXVZWyrKXCDjmWON&amp;rev=1&amp;drawingRevisionAccessToken=1z-drkqllK60TQ&amp;h=1&amp;w=621&amp;ac=1"
                style="width: 621.27px; height: 1.33px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                title=""></span></p>
    <p class="c4 c5"><span class="c3"></span></p>
    <p class="c4"><span class="c7">Should you have any enquiries, you may email us at </span><span
            class="c11 c7">AOH22@defence.gov.sg</span><span class="c3">.<br></span></p>
    <p class="c4 c5"><span class="c3"></span></p>
    <p class="c4 c5"><span class="c3"></span></p>
    <p class="c4"><span class="c3"><br>Yours sincerely,<br>AOH22 Organising Committee</span></p>
    <p class="c4"><br><br><span
            style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 358.38px; height: 250.86px;"><img
                alt=""
                src="https://lh5.googleusercontent.com/t74v4pLOW5Pt7B_V029-r_EQUZDeBJHPHKe6Q8Qx97OPSMG-VR5meNQDq1rmYvb-4yTpUMV7ZeCsRWNweFbpxehan_UGv2Dle_5OgUHVPQKgE5XZ5mmjYA2wy3BnVSvs5wRemM4qPXhn_3eqmwI"
                style="width: 358.38px; height: 250.86px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                title=""></span><span class="c3"><br><br><br></span><span
            style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 621.27px; height: 1.33px;"><img
                alt=""
                src="https://docs.google.com/drawings/d/sotD1yCvNC1B-whYBS3M7kg/image?parent=e/2PACX-1vQHPKs76exoqHnn5tY0aBpwMtakCCO-mt-QfX6ouKAtvlGW-UMZxGhVvobITnSdWXVZWyrKXCDjmWON&amp;rev=1&amp;drawingRevisionAccessToken=Es0J2fiX6Vzj7Q&amp;h=1&amp;w=621&amp;ac=1"
                style="width: 621.27px; height: 1.33px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                title=""></span></p>
</div>`,
      });

      const otpStore = admin
        .firestore()
        .collection("otp")
        .where("email", "==", email);

      const querySnapshot = await otpStore.get();

      let count = 0;
      let id = null;

      querySnapshot.forEach((docs) => {
        id = docs.id;
        count++;
      });

      if (count > 0) {
        admin.firestore().collection("otp").doc(String(id)).update({
          code,
          expiredAt,
        });
      } else {
        admin.firestore().collection("otp").doc().set({
          email,
          code,
          expiredAt,
        });
      }
    }

    return;
  } catch (error) {
    const err = error as Error;
    return Promise.reject(
      new functions.https.HttpsError(errorCode, err?.message)
    );
  }
});

export default sendEmailOtp;
