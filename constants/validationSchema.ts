import {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  string,
  StringSchema,
} from "yup";

const MAX_IMAGE_SIZE = 5;
const MAX_VIDEO_SIZE = 50;

export const requiredString = string().required(
  "Required"
) as StringSchema<string>;
export const requiredUrl = string().url("Invalid URL").required("Required");
export const optionalUrl = string().url("Invalid URL");
export const optionaString = string() as StringSchema<string>;
export const requiredBoolean = boolean().required("Required");
export const requiredDate = date().required("Required");

export const requireObjectSelect = object().shape({
  value: string().required("Required"),
  label: string(),
});

export const requiredArrayOfStrings = array().of(string()).min(1, "Required");
export const requiredNumber = number()
  .integer("Not an integer number")
  .min(1, "Minimum pax is 1")
  .required("Required");

export const requiredEmail = string()
  .email("Invalid email address")
  .required("Required");

export const requiredVerificationCode = requiredString
  .max(6, "Verification code must 6 characters and alphanumeric")
  .matches(
    /^(?=.{6,})(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
    "Verification code must 6 characters and alphanumeric"
  );

export const requiredPassword = requiredString.matches(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&`#^()_\-+={}[\]\\|:;.,/])[A-Za-z\d@$!%*?&`#^.,/()_\-+={}[\]\\|:;]{8,}$/,
  "Password must contain at least 8 characters with minimum 1 number, 1 special character, 1 lowercase letter, and 1 uppercase letter"
);

export const requiredFile = mixed()
  .required("Required")
  .test("arrayBuffer", "Invalid file/URL", (value) => {
    if (typeof value === "string" && value.length > 0) {
      return true;
    }

    if (value) {
      return value instanceof window.File;
    }

    return false;
  })
  .test(
    "imageSize",
    `Maximum image size is ${MAX_IMAGE_SIZE}MB`,
    (value?: File | string) => {
      if (value instanceof File) {
        if (value.type.split("/")[0] === "image") {
          return value.size <= MAX_IMAGE_SIZE * 1024 * 1024;
        }

        return true;
      }

      return true;
    }
  )
  .test(
    "videoSize",
    `Maximum video size is ${MAX_VIDEO_SIZE}MB`,
    (value?: File | string) => {
      if (value instanceof File) {
        if (value.type.split("/")[0] === "video") {
          return value.size <= MAX_VIDEO_SIZE * 1024 * 1024;
        }

        return true;
      }

      return true;
    }
  );

export const requiredFilesObject = mixed()
  .required("Required")
  .test("arrayBuffer", "Invalid file/URL", (value) => {
    if (typeof value.url === "string" && value.url.length > 0) {
      return true;
    }

    if (value.url) {
      return value.url instanceof window.File;
    }

    return false;
  });

export const decimalNumber = number().test(
  "maxDigitsAfterDecimal",
  "number field must have 2 digits after decimal or less",
  (number: any) => /^\d+(\.\d{1,2})?$/.test(number)
);

export const optionalFile = mixed().test(
  "arrayBuffer",
  "Invalid file/URL",
  (value) => {
    if (typeof value === "string" || typeof value === "undefined") {
      return true;
    }

    if (value) {
      return value instanceof window.File;
    }

    return false;
  }
);

export const arrayOfRequiredFiles = array().of(requiredFile).min(1, "Required");
export const arrayOfRequiredFilesObject = array()
  .of(requiredFilesObject)
  .min(1, "Required");

export const arrayOfCaptionedImages = array()
  .of(
    object().shape({
      body: requiredString,
      image: requiredFile,
    })
  )
  .min(1, "Required");

export const arrayOfPressMedia = array()
  .of(
    object().shape({
      body: requiredString,
      image: requiredFile,
      description: requiredString,
    })
  )
  .min(1, "Required");

export const arrayOfReviews = array()
  .of(
    object().shape({
      text: requiredString,
      description: requiredString,
    })
  )
  .min(1, "Required");

export const arrayOfThumbnails = array()
  .of(
    object().shape({
      image: requiredFile,
    })
  )
  .min(1, "Required");

export const arrayOfEpisodeGuide = array()
  .of(
    object().shape({
      image: requiredFile,
      label: requiredString,
      thumbnail: requiredFile,
    })
  )
  .min(1, "Required");

export const arrayOfMain = array()
  .of(
    object().shape({
      image: requiredFile,
    })
  )
  .min(1, "Required");

export const arrayOfImageFeed = array()
  .of(
    object().shape({
      file: requiredFile,
    })
  )
  .min(1, "Required");

export const arrayOfAnswers = array()
  .of(
    object().shape({
      option: requiredString,
    })
  )
  .min(1, "Required");

export const arrayOfVariants = array().of(
  object().shape({
    hexCode: requiredString,
    name: requiredString,
    productVariantThumbnails: arrayOfRequiredFiles,
  })
);
// .min(1, "Required");

export const arrayOfProductPosition = array()
  .of(
    object().shape({
      type: requiredString,
      position: requiredNumber,
    })
  )
  .min(1, "Required");

export const arrayOfPostAssets = array()
  .of(
    object().shape({
      url: requiredFile,
    })
  )
  .min(1, "Required");

export const requiredTitleInProfile = string().max(30).required("Required");
export const requiredDescriptionInProfile = mixed()
  .test(
    "maxDescriptionCharacter",
    "Description must not be longer 45 words",
    (value) => {
      const content =
        new DOMParser()
          .parseFromString(value, "text/html")
          ?.body.textContent?.trim() ?? "";
      if (content.length < 45) {
        return true;
      }
      return false;
    }
  )
  .test("minDescriptionCharacter", "Required", (value) => {
    const content =
      new DOMParser()
        .parseFromString(value, "text/html")
        ?.body.textContent?.trim() ?? "";
    if (content.length > 0) {
      return true;
    }
    return false;
  });
export const requiredDescriptionSpotlight = mixed()
  .test(
    "maxDescriptionCharacterSpotlight",
    "Description must not be longer 100 words",
    (value) => {
      const content =
        new DOMParser()
          .parseFromString(value, "text/html")
          ?.body.textContent?.trim() ?? "";
      if (content.length < 100) {
        return true;
      }
      return false;
    }
  )
  .test("minDescriptionCharacterSpotlight", "Required", (value) => {
    const content =
      new DOMParser()
        .parseFromString(value, "text/html")
        ?.body.textContent?.trim() ?? "";
    if (content.length > 0) {
      return true;
    }
    return false;
  });

export const arrayOfHairColors = array()
  .of(
    object().shape({
      colorName: requiredString,
      colorHex: requiredString,
    })
  )
  .min(1, "Required");

const alphabetAndWhitespacePattern = /^[A-Za-z\s]*$/;

export const requiredName = requiredString
  .matches(
    alphabetAndWhitespacePattern,
    "Name only accepts alphabet and whitespace"
  )
  .trim();

export const optionalName = string()
  .matches(
    alphabetAndWhitespacePattern,
    "Name only accepts alphabet and whitespace"
  )
  .trim();
