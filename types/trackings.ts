import firebase from "firebase/compat";

export interface TrackingPayloadType {
  type: string;
}

export interface OnClickPayloadType extends TrackingPayloadType {
  isClicked: boolean;
  data: {
    slug: string;
    title: string;
  };
  page?: string;
  shouldWaitForOther?: boolean;
  isReady?: boolean;
}

export interface OnBookingPayloadType extends TrackingPayloadType {
  isClicked: boolean;
  data: {
    date: string;
    time: string;
    pax: number;
    vanue: string;
    title: string;
  };
}

export interface DwellPayloadType extends TrackingPayloadType {
  entryTime: Date;
  exitTime: Date;
  seconds: number;
}

export interface LoginPayloadType {
  user: {
    id: string;
    name: string;
    email: string;
  };
  event: string;
  loginTime: Date;
  sessionID: string;
  status: "login";
}

export interface LogoutPayloadType {
  logoutTime: Date;
  sessionID: string;
}

export interface LoginResult {
  user: {
    id: string;
    name: string;
    email: string;
  };
  event: string;
  loginTime: firebase.firestore.Timestamp;
  sessionID: string;
  status: string;
}
