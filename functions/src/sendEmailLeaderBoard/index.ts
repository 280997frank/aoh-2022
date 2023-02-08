import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as QRCode from "qrcode";
import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";
import * as dayjs from "dayjs";
import { getHtmlLeaderboard } from "../function/get-html-leaderboard";
import _ = require("lodash");
import DocumentData = firestore.DocumentData;

interface LeaderboardItem {
  id: string;
  email: string;
  gameName: string;
}

const { user, port, password, secure, host } = functions.config().email;
const db = admin.firestore();

const sendEmailLeaderBoard = functions.pubsub
  .schedule("59 23 * * *")
  .timeZone("Asia/Singapore")
  .onRun(async () => {
    try {
      const thisday = dayjs(new Date());
      const lastday = dayjs("2022-06-11");
      if (thisday.isBefore(lastday)) {
        const leaderBoardCollection = db.collection("leaderboards");
        const today = dayjs().tz("Asia/Singapore").format("DD-MM-YYYY");
        // const today = "04-05-2022";
        const generalQuery = leaderBoardCollection.where("date", "==", today);
        // .limit(5);

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: {
            user,
            pass: password,
          },
        });

        const game1 = await generalQuery
          .where("gameName", "==", "obstacleSpeedRacer")
          .orderBy("score", "desc")
          .get();
        const game2 = await generalQuery
          .where("gameName", "==", "droneFlying")
          .orderBy("score", "desc")
          .get();
        const game3 = await generalQuery
          .where("gameName", "==", "spotSoldier")
          .orderBy("score", "desc")
          .get();
        const game4 = await generalQuery
          .where("gameName", "==", "sar21Shooting")
          .orderBy("score", "desc")
          .get();
        const game5 = await generalQuery
          .where("gameName", "==", "obstacleCourse")
          .orderBy("score", "asc")
          .get();

        const promise = (docs: LeaderboardItem[]) => {
          // console.log(docs);
          // return docs;
          return docs.map(async (doc) => {
            let qrcode: Buffer = Buffer.from("");
            try {
              qrcode = await QRCode.toBuffer(doc.id);
            } catch (err) {
              console.log("error", err);
            }

            return await transporter.sendMail({
              from: `"Army Open House" <${user}>`,
              to: doc.email,
              subject: "Virtual Game Prize Redemption: AOH22",
              html: getHtmlLeaderboard({ gameName: doc.gameName }),
              attachments: [
                {
                  filename: "qrcode.png",
                  content: qrcode,
                  cid: "qrcode",
                },
              ],
            });
          });
        };

        const filterFive = (docs: DocumentData[]) => {
          const x: LeaderboardItem[] = [];
          docs.map((doc) => {
            const xx = doc.data() as LeaderboardItem;
            xx.id = doc.id;
            x.push(xx);
          });
          const unique1 = _.uniqBy(x, "email");
          return unique1.slice(0, 5);
        };

        await Promise.all(promise(filterFive(game1.docs)));
        await Promise.all(promise(filterFive(game2.docs)));
        await Promise.all(promise(filterFive(game3.docs)));
        await Promise.all(promise(filterFive(game4.docs)));
        await Promise.all(promise(filterFive(game5.docs)));
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  });

export default sendEmailLeaderBoard;
