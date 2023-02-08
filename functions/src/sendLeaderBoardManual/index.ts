import * as functions from "firebase-functions";
import { sendEmailLeaderboardSingle } from "../function/send-email-leaderboard-single";

const sendLeaderBoardManual = functions.https.onCall(
  sendEmailLeaderboardSingle
);

export default sendLeaderBoardManual;
