import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as dayjs from "dayjs";
import { leaderboardResponseDto } from "../dto/leaderboard-response.dto";
import { LeaderboardInputDto } from "../dto/leaderboard-input.dto";
import _ = require("lodash");
const db = admin.firestore();

const getLeaderboard = functions.https.onCall(
  async (data: LeaderboardInputDto) => {
    try {
      const today = dayjs().tz("Asia/Singapore").format("DD-MM-YYYY");
      // const today = "04-05-2022";
      const leaderboard = await db
        .collection("leaderboards")
        .where("date", "==", today)
        .where("gameName", "==", data.gameName)
        .orderBy("score", data.gameName === "obstacleCourse" ? "asc" : "desc")
        // .limit(5)
        .get()
        .then((doc) => {
          const res: leaderboardResponseDto[] = [];
          doc.docs.map((data) => {
            const x = data.data();
            res.push(<leaderboardResponseDto>x);
          });
          return res;
        });

      const unique = _.uniqBy(leaderboard, "email");

      const leaderboardTopFive = unique.slice(0, 5);
      const findEmail = leaderboardTopFive.find((x) => x.email === data.email);

      if (findEmail) {
        return leaderboardTopFive;
      }
      const myEmail = unique.find((x) => x.email === data.email);
      if (myEmail) {
        leaderboardTopFive.push(myEmail);
      }
      // response.send(leaderboardTopFive);
      return leaderboardTopFive;
    } catch (error) {
      const err = error as Error;
      return Promise.reject(
        new functions.https.HttpsError("unknown", err?.message)
      );
    }
  }
);
// const getLeaderboard = functions.https.onRequest(async (req, response) => {
//   try {
//     // response.set("Content-Type", "application/json");
//     response.set("Access-Control-Allow-Origin", "*");
//     response.set("Access-Control-Allow-Methods", "*");
//     // response.set("Access-Control-Allow-Headers", "Content-Type");
//
//       if (req.method === "OPTIONS") {
//         response.set("Access-Control-Allow-Methods", "GET");
//         response.set("Access-Control-Max-Age", "3600");
//         response.status(204).send("");
//       } else {
//         const today = dayjs().tz("Asia/Singapore").format("YYYY-MM-DD");
//         // const today = "2022-04-10";
//         const leaderboard = await db
//             .collection("leaderboards")
//             .where("date", "==", today)
//             .where("gameName", "==", req.query.gameName)
//             .orderBy("score", "desc")
//             // .limit(5)
//             .get()
//             .then((doc) => {
//               const res: leaderboardResponseDto[] = [];
//               doc.docs.map((data) => {
//                 const x = data.data();
//                 res.push(<leaderboardResponseDto>x);
//               });
//               return res;
//             });
//         const leaderboardTopFive = leaderboard.slice(0, 5);
//         const findEmail = leaderboardTopFive.find(
//             (x) => x.email === req.query.email
//         );
//
//         if (findEmail) {
//           response.send(leaderboardTopFive);
//           return;
//         }
//         const myEmail = leaderboard.find((x) => x.email === req.query.email);
//         if (myEmail) {
//           leaderboardTopFive.push(myEmail);
//         }
//         response.send(leaderboardTopFive);
//       }
//   } catch (error) {
//     const err = error as Error;
//     return Promise.reject(
//       new functions.https.HttpsError("unknown", err?.message)
//     );
//   }
// });

export default getLeaderboard;
