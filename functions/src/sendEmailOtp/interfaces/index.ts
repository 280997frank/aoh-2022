export interface UserRegister {
  email: string;
  firstName: string;
  lastName: string;
}

export interface RequestOtpPayload {
  email: string;
  recaptcha: string;
}

export interface OtpDocument {
  code: string;
  email: string;
  expiredAt: Date;
}
