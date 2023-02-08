import * as functions from "firebase-functions";
import { downloadReport } from "../function/download-report";
import * as dayjs from "dayjs";
const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "2GB" as const,
};
const downloadDailyReport = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (request, response) => {
    const download = await downloadReport();
    // response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const today = dayjs().tz("Asia/Singapore").format("YYYYMMDDHHmmss");
    response.attachment(`daily_report_${today}.xlsx`);
    response.send(download);
  });

export default downloadDailyReport;
