import { number, string } from "yup";

export interface IBookings {
  description: string;
  description2: string;
}

export interface TimeSlot {
  venue: string;
  sequence: number;
  period: string;
  ticketName: string;
  isFullyBooked: boolean;
}

export interface Ticket {
  type: "online" | "walk-in";
  status: "available" | "checked-in" | "checked-out";
  eventDate: string;
  timeSlot: string;
  venue: string;
  pax: number;
  firstName: string;
  lastName: string;
  email: string;
  bookingTime: {
    seconds: number;
  };
  checkInTime: {
    seconds: number;
  };
  actualPax: number;
  isPrivate: boolean;
}

export interface HourlyData {
  offlineQuota: number;
  onlineQuota: number;
  sequence: number;
  time: string;
}
