import { object, string, number, array, StringSchema, boolean } from "yup";

import { RoleType } from "./types/role.type";

const requiredString = string().required();
const requiredEmail = string()
  .email("Invalid email address")
  .required("Required");
const requiredNumber = number().required();
const validRole = string()
  .oneOf([RoleType.ADMIN, RoleType.USER])
  .default(RoleType.USER);

const alphabetAndWhitespacePattern = /^[A-Za-z\s]*$/;

const requiredArrayOfStrings = array().of(string()).min(1, "Required");
const optionalString = string() as StringSchema<string>;
const requiredBoolean = boolean().required("Required");
const requiredName = requiredString
  .matches(
    alphabetAndWhitespacePattern,
    "Name only accepts alphabet and whitespace"
  )
  .trim();

const optionalName = string()
  .matches(
    alphabetAndWhitespacePattern,
    "Name only accepts alphabet and whitespace"
  )
  .trim();

const requiredPassword = requiredString.matches(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&`#^()_\-+={}[\]\\|:;.,/])[A-Za-z\d@$!%*?&`#^.,/()_\-+={}[\]\\|:;]{8,}$/,
  "Password must contain at least 8 characters with minimum 1 number, " +
    "1 special character, 1 lowercase letter, and 1 uppercase letter"
);

export const bookOnlineTicketSchema = object().shape({
  date: requiredString,
  time: requiredString,
  pax: requiredNumber.min(1).max(5),
  recaptcha: requiredString,
  venueId: requiredString,
});

export const createUserSchema = object().shape({
  email: requiredEmail,
  firstName: requiredName,
  lastName: optionalName,
  role: validRole,
  code: requiredString,
  password: requiredPassword,
});

export const createUserWithoutOtpSchema = object().shape({
  email: requiredEmail,
  firstName: requiredName,
  lastName: optionalName,
  role: validRole,
  password: requiredPassword,
  recaptcha: requiredString,
});

export const submitScoreLeaderBoardSchema = object().shape({
  data: requiredString,
  // lastName: optionalName,
  // gameName: requiredString,
  recaptcha: requiredString,
  // email: requiredEmail,
  // score: requiredNumber,
});

export const requestOtpSchema = object().shape({
  email: requiredString,
  recaptcha: string(),
  recaptchaV3: string(),
});

export const submitNsStorySchema = object().shape({
  title: requiredString,
  categoryName: requiredString,
  story: requiredString,
  storyPlace: requiredString,
  storyPictures: requiredArrayOfStrings,
  caption: requiredString,
  audioUrl: optionalString,
  videoUrl: optionalString,
  isDonate: requiredBoolean,
  name: requiredName,
  email: requiredEmail,
  unit: requiredString,
  phone: requiredString,
  rank: requiredString,
  recaptcha: requiredString,
});
