import { Icon, IconProps } from "@chakra-ui/react";

const PlayButtonIcon = (props: IconProps) => (
  // <Icon viewBox="0 0 123 53" fill="none" {...props} >
  <Icon viewBox="0 0 179 179" fill="none" {...props}>
    <circle
      cx="18.5"
      cy="18.5"
      r="18.5"
      transform="rotate(-90 18.5 18.5)"
      fill="#C0BE9A"
      fillOpacity="0.74"
    />
    <path
      opacity="0.77"
      d="M89.2363 178.473C138.52 178.473 178.473 138.52 178.473 89.2363C178.473 39.9525 138.52 0 89.2363 0C39.9525 0 0 39.9525 0 89.2363C0 138.52 39.9525 178.473 89.2363 178.473Z"
      fill="black"
      fillOpacity="0.65"
    />
    <path
      opacity="0.74"
      d="M71.3604 122.096V56.3593L125.283 89.2368L71.3604 122.096Z"
      fill="white"
    />
  </Icon>
);

export default PlayButtonIcon;
