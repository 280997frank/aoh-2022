export interface IRegisterPage {
  tnc: string;
  otp: string;
  success: string;
  advisory: string;
  useOtp: boolean;
}

export interface OtpPayload {
  otp: string[];
}

export type PageMode = "register" | "otp" | "success";
