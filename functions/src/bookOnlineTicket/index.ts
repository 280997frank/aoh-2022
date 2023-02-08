import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { bookOnlineTicketSchema } from "../validationSchemas";
import { verifyRecaptcha } from "../recaptcha";
import { walkIn } from "../function/walk-in";

const db = admin.firestore();

const bookOnlineTicket = functions.https.onCall(async (data, context) => {
  let errorCode: functions.https.FunctionsErrorCode = "unknown";
  try {
    if (!context.auth) {
      errorCode = "unauthenticated";
      throw new Error("Missing user ID");
    }

    const isParamValid = bookOnlineTicketSchema.isValidSync(data);

    if (!isParamValid) {
      errorCode = "invalid-argument";
      throw new Error("Parameter is invalid");
    }

    await verifyRecaptcha(data.recaptcha, context);

    const { uid } = context.auth;
    const userRef = db.collection("users").doc(uid);
    const user = await userRef.get();

    if (!user.exists) {
      throw new Error("User is not found");
    }

    const venueRef = db.collection("timeslots").doc(data.venueId);
    const venue = await venueRef.get();

    if (!venue.exists) {
      throw new Error("Venue is not found");
    }

    const venueData = venue.data();

    const ticketRef = db.collection("tickets");

    const userData = user.data();
    const userTickets = await ticketRef
      .where("email", "==", userData?.email)
      .get();

    const ticketsForThisParticularVenue = userTickets.docs
      .map((doc) => doc.data() as unknown as Record<string, string>)
      .filter((data) => {
        return data.venue === venueData?.venue;
      });

    if (ticketsForThisParticularVenue.length > 4) {
      throw new Error("Maximum 5 tickets per venue");
    }

    // Ensure that one person can only book one ticket for one timeslot per venue.
    // In other words, the person can book at all 3 venues but only 1 ticket 1 timeslot
    const isTimeSlotAlreadyBooked = userTickets.docs.some((doc) => {
      const ticketData = doc.data() as unknown as Record<string, string>;
      return (
        ticketData.venue === venueData?.venue &&
        ticketData.eventDate === data.date /* &&
        ticketData.timeSlot === data.time */
      );
    });

    if (isTimeSlotAlreadyBooked) {
      throw new Error(
        "You have already booked a ticket for this date in this venue"
      );
    }

    const paxCountRef = db
      .collection("timeslots")
      .doc(data.venueId)
      .collection("dates")
      .doc(data.date)
      .collection("times")
      .doc(data.time.replace(/\./g, "").replace(/:/g, ""));

    const paxCount = await paxCountRef.get();
    const paxCountData = paxCount.data();

    if ((paxCountData?.onlineQuota || 0) < data.pax) {
      throw new Error(
        // `Only ${paxCountData?.onlineQuota || 0} ticket(s) remaining`
        "The timeslot selected is full. Please try another timeslot."
      );
    }

    if (paxCountData?.onlineQuota - data.pax < 0) {
      throw new Error(
        // `Only ${paxCountData?.onlineQuota || 0} ticket(s) remaining`
        "The timeslot selected is Almost full. Please try with lower pax for this timeslot."
      );
    }

    const payload = {
      type: "online",
      status: "available",
      eventDate: data.date,
      timeSlot: data.time,
      venue: venueData?.venue || "N/A",
      pax: data.pax,
      firstName: userData?.firstName || "N/A",
      lastName: userData?.lastName || "",
      email: userData?.email || "N/A",
      bookingTime: admin.firestore.FieldValue.serverTimestamp(),
      isPrivate: false,
    };

    const res = await ticketRef.add(payload);

    // then update counter
    await paxCountRef.update({
      onlineQuota: admin.firestore.FieldValue.increment(-data.pax),
    });

    // send email
    await walkIn({ email: payload.email, ticketId: res.id });

    return { ticketId: res.id };
  } catch (error) {
    return Promise.reject(
      new functions.https.HttpsError(errorCode, (error as Error).message)
    );
  }
});

export default bookOnlineTicket;
