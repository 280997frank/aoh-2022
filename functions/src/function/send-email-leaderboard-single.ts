import { SendEmailLeaderboardSingleDto } from "./send-email-leaderboard-single.dto";
import { getHtmlLeaderboard } from "./get-html-leaderboard";
import * as nodemailer from "nodemailer";
import * as functions from "firebase-functions";
import * as QRCode from "qrcode";
import * as admin from "firebase-admin";

const { user, port, password, secure, host } = functions.config().email;
const db = admin.firestore();
export const sendEmailLeaderboardSingle = async ({
  email,
  gameName,
  leaderBoardId,
}: SendEmailLeaderboardSingleDto) => {
  let errorCode: functions.https.FunctionsErrorCode = "unknown";
  try {
    const leaderBoardCollection = db.collection("leaderboards");
    const leaderBoard = await leaderBoardCollection.doc(leaderBoardId).get();
    if (!leaderBoard.exists) {
      errorCode = "not-found";
      throw new Error("Leaderboard is not found");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass: password,
      },
    });

    let qrcode: Buffer = Buffer.from("");
    try {
      qrcode = await QRCode.toBuffer(leaderBoardId);
    } catch (err) {
      console.log("error", err);
    }

    return await transporter.sendMail({
      from: `"Army Open House" <${user}>`,
      to: email,
      subject: "Virtual Game Prize Redemption: AOH22",
      html: getHtmlLeaderboard({ gameName }),
      attachments: [
        {
          filename: "qrcode.png",
          content: qrcode,
          cid: "qrcode",
        },
      ],
    });
  } catch (e) {
    return Promise.reject(
      new functions.https.HttpsError(errorCode, (e as Error).message)
    );
  }
};
