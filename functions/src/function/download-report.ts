import * as dayjs from "dayjs";
import * as Excel from "exceljs";
import * as admin from "firebase-admin";
import _ = require("lodash");

interface dataItem {
  date: string;
  time: string;
  pax: number;
  vanue: string;
  slug: string;
  score: number;
  email: string;
  firstName: string;
  lastName: string;
  gameName: string;
}

interface user {
  email: string;
  firstName: string;
  lastName: string;
}

interface dateFirestore {
  seconds: number;
  nanoseconds: number;
}

interface docItem {
  idx: string;
  event: string;
  type: string;
  page: string;
  data: dataItem;
  timestamps: dateFirestore;
  loginTime: dateFirestore;
  logoutTime: dateFirestore;
  user: user;
  status: string;
}

// const {user, port, password, secure, host} = functions.config().email;
const db = admin.firestore();

export const downloadReport = async () => {
  try {
    const trackingCollection = db.collection("trackings");
    const userCollection = db.collection("users");
    const firstTime = dayjs().tz("Asia/Singapore").startOf("day").toISOString();
    console.log(firstTime);
    // const today = "04-05-2022";
    const generalQuery = trackingCollection
      // .where("timestamps", ">", new Date(firstTime))
      .get();
    const userQuery = userCollection
      // .where("timestamps", ">", new Date(firstTime))
      .get();
    const findType = (val: string, data: docItem[]) => {
      const result: docItem[] = [];
      data.map((item) => {
        if (item.type === val) {
          result.push(item);
        }
      });
      return result;
    };
    const findDownload = (val: string, data: docItem[]) => {
      const result: docItem[] = [];
      data.map((item) => {
        if (item.type === "download") {
          if (item?.data?.slug === val) {
            result.push(item);
          }
        }
      });
      return result;
    };
    const clicks: docItem[] = [];
    const logins: docItem[] = [];
    const bookings: docItem[] = [];
    const redeems: docItem[] = [];
    await generalQuery.then((documents) => {
      documents.docs.map((docs) => {
        if (docs.data()?.event === "click") {
          clicks.push(<docItem>docs.data());
        }
        if (
          docs.data()?.event === "booking" &&
          docs.data()?.type === "booking"
        ) {
          const x = docs.data();
          x.idx = `${docs.data()?.data.date}_${docs.data()?.data.time}_${
            docs.data()?.data.vanue
          }`;
          bookings.push(<docItem>x);
        }
        if (docs.data()?.event === "click" && docs.data()?.type === "redeem") {
          redeems.push(<docItem>docs.data());
        }
        if (docs.data()?.type === "login") {
          // console.log(docs.data());
          if (docs.data()?.user?.email !== "") {
            logins.push(<docItem>docs.data());
          }
        }
      });
    });

    const clickType = [
      "zones",
      "hotspot",
      "download",
      "take-a-selfie",
      "ig-filter",
      "pledge-your-support",
      "game",
    ];

    // .limit(5);
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Clicks");
    worksheet.columns = [
      { header: "Type", key: "type" },
      { header: "Click Count", key: "clickCount" },
    ];

    clickType.forEach((e) => {
      worksheet.addRow({
        type: e,
        clickCount: findType(e, clicks).length,
      });
    });
    worksheet.addRow({
      type: "Colouring book Download",
      clickCount: findDownload("/kids-zone/colouring-book", clicks).length,
    });
    const worksheet2 = workbook.addWorksheet("Login");
    worksheet2.columns = [
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "email", key: "email" },
      { header: "Login", key: "login" },
      { header: "Logout", key: "logout" },
    ];
    // const logins = findType("login",clicks)
    // console.log(logins)
    logins.forEach((e) => {
      let jsDate = "";
      try {
        const timestamp = new admin.firestore.Timestamp(
          e?.loginTime.seconds,
          e?.loginTime.nanoseconds
        );
        const jsDatex = timestamp.toDate();

        if (dayjs(jsDatex).isValid()) {
          jsDate = dayjs(jsDatex)
            .tz("Asia/Singapore")
            .format("YYYY-MM-DD HH:mm:ss");
        }
      } catch (e) {
        console.error(e);
      }
      let jsDate2 = "";
      if (e?.status === "logout") {
        try {
          const timestamp2 = new admin.firestore.Timestamp(
            e?.logoutTime.seconds,
            e?.logoutTime.nanoseconds
          );
          const jsDatex2 = timestamp2.toDate();

          if (dayjs(jsDatex2).isValid()) {
            jsDate2 = dayjs(jsDatex2)
              .tz("Asia/Singapore")
              .format("YYYY-MM-DD HH:mm:ss");
          }
        } catch (e) {
          console.error(e);
        }
      }
      const datas = {
        firstName: e?.user?.firstName,
        lastName: e?.user?.lastName,
        email: e?.user?.email,
        login: jsDate,
        logout: jsDate2,
      };

      worksheet2.addRow(datas);
    });
    // console.log(bookings)
    const remDupBookings = _.uniqBy(bookings, "idx");
    const worksheet3 = workbook.addWorksheet("Bookings");
    worksheet3.columns = [
      { header: "Venue", key: "venue" },
      { header: "Date", key: "date" },
      { header: "Time", key: "time" },
      { header: "Ticket", key: "ticket" },
    ];
    // const venues = ["F1 Pit Building", "Punggol", "Bishan"];
    const findBooking = (idx: string, data: docItem[]) => {
      // let timeslot = 0;
      let ticket = 0;
      let ticketing: docItem = data[0];
      data.forEach((item) => {
        if (item?.idx === idx) {
          ticketing = item;
          ticket = ticket + item?.data?.pax;
          // timeslot++;
          // ticket.push(item)
        }
      });
      ticketing.data.pax = ticket;
      return ticketing;
    };
    remDupBookings.forEach((e) => {
      const findbook = findBooking(e?.idx, bookings);
      // findbook.map(item =>{
      worksheet3.addRow({
        venue: findbook?.data?.vanue,
        date: findbook?.data?.date,
        time: findbook?.data?.time,
        ticket: findbook?.data?.pax,
      });
      // })
    });
    const worksheet4 = workbook.addWorksheet("Redeems");
    worksheet4.columns = [
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "email", key: "email" },
      { header: "Game Name", key: "gameName" },
      { header: "Score", key: "score" },
      { header: "Play Date", key: "date" },
    ];

    redeems.forEach((e) => {
      worksheet4.addRow({
        firstName: e?.data?.firstName,
        lastName: e?.data?.lastName,
        email: e?.data?.email,
        date: e?.data?.date,
        score: e?.data?.score,
        gameName: e?.data?.gameName,
      });
    });
    const worksheet5 = workbook.addWorksheet("Users");
    worksheet5.columns = [
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "email", key: "email" },
    ];
    await userQuery.then((documents) => {
      documents.docs.map((docs) => {
        // redeems.forEach((e) => {
        worksheet5.addRow({
          firstName: docs.data().firstName,
          lastName: docs.data().lastName,
          email: docs.data().email,
        });
        // });
      });
    });

    return await workbook.xlsx.writeBuffer();
  } catch (e) {
    console.log(e);
  }

  return null;
};
