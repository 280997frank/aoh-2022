import * as functions from "firebase-functions";
import { sendEmailDaily } from "../function/send-email-daily-report";
const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "2GB" as const,
};
const sendEmailDailyReportAm = functions
  .runWith(runtimeOpts)
  .pubsub.schedule("30 6 * * *")
  .timeZone("Asia/Singapore")
  .onRun(async () => sendEmailDaily);

export default sendEmailDailyReportAm;
