import * as functions from "firebase-functions";
import { sendEmailDaily } from "../function/send-email-daily-report";
const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "2GB" as const,
};
const sendEmailDailyReport = functions
  .runWith(runtimeOpts)
  .pubsub.schedule("0 */2 * * *")
  .timeZone("Asia/Singapore")
  .onRun(async () => sendEmailDaily);

export default sendEmailDailyReport;
