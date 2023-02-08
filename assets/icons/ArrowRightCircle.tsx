import { Icon, IconProps } from "@chakra-ui/react";

const ArrowRightCircle = (props: IconProps) => (
  // <Icon viewBox="0 0 123 53" fill="none" {...props} >
  <Icon viewBox="0 0 37 37" fill="none" {...props}>
    <circle
      cx="18.5"
      cy="18.5"
      r="18.5"
      transform="rotate(90 18.5 18.5)"
      fill="#C0BE9A"
      fillOpacity="0.74"
    />
    <path
      d="M14.3354 10.7941C14.5695 10.7941 14.8037 10.8814 14.9823 11.06L22.5827 18.6604C22.7533 18.8311 22.8525 19.0652 22.8525 19.3073C22.8525 19.5494 22.7573 19.7836 22.5866 19.9542L14.9783 27.5625C14.6211 27.9197 14.0417 27.9197 13.6845 27.5625C13.3273 27.2053 13.3273 26.6259 13.6845 26.2687L20.6459 19.3073L13.6924 12.3539C13.3352 11.9967 13.3352 11.4172 13.6924 11.06C13.871 10.8814 14.1052 10.7941 14.3393 10.7941L14.3354 10.7941Z"
      fill="white"
    />
  </Icon>
);

export default ArrowRightCircle;
