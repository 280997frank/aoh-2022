import { Icon, IconProps } from "@chakra-ui/react";

const ArrowLeftCircle = (props: IconProps) => (
  // <Icon viewBox="0 0 123 53" fill="none" {...props} >
  <Icon viewBox="0 0 37 37" fill="none" {...props}>
    <circle
      cx="18.5"
      cy="18.5"
      r="18.5"
      transform="rotate(-90 18.5 18.5)"
      fill="#C0BE9A"
      fillOpacity="0.74"
    />
    <path
      d="M22.6646 26.2059C22.4305 26.2059 22.1963 26.1186 22.0177 25.94L14.4173 18.3396C14.2467 18.1689 14.1475 17.9348 14.1475 17.6927C14.1475 17.4506 14.2427 17.2164 14.4134 17.0458L22.0217 9.43745C22.3789 9.08026 22.9583 9.08026 23.3155 9.43745C23.6727 9.79465 23.6727 10.3741 23.3155 10.7313L16.3541 17.6927L23.3076 24.6461C23.6648 25.0033 23.6648 25.5828 23.3076 25.94C23.129 26.1186 22.8948 26.2059 22.6607 26.2059H22.6646Z"
      fill="white"
    />
  </Icon>
);

export default ArrowLeftCircle;
