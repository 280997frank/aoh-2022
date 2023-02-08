import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { leaderboardResponseDto } from "../dto/leaderboard-response.dto";
import { LeaderboardDashboardInputDto } from "../dto/leaderboard-dashboard-input.dto";
import _ = require("lodash");
const db = admin.firestore();

const getLeaderboardDashboard = functions.https.onCall(
  async (data: LeaderboardDashboardInputDto) => {
    try {
      const leaderboard = await db
        .collection("leaderboards")
        .where("date", "==", data.date)
        .where("gameName", "==", data.gameName)
        .orderBy("score", data.gameName === "obstacleCourse" ? "asc" : "desc")
        // .limit(5)
        .get()
        .then((doc) => {
          const res: leaderboardResponseDto[] = [];
          doc.docs.map((item) => {
            const data = item.data();
            const id = item.id;
            res.push(<leaderboardResponseDto>{ ...data, id });
          });
          return res;
        });
      const unique = _.uniqBy(leaderboard, "email");
      const leaderboardTopFive = unique.slice(0, 5);

      return leaderboardTopFive;
    } catch (error) {
      const err = error as Error;
      return Promise.reject(
        new functions.https.HttpsError("unknown", err?.message)
      );
    }
  }
);

export default getLeaderboardDashboard;
