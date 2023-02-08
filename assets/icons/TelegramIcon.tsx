import { Icon, IconProps } from "@chakra-ui/react";

const TelegramIcon = (props: IconProps) => (
  <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65" {...props}>
    <path
      d="M25.1584 33.7754L27.6897 42.0738C27.7333 42.2046 27.9256 42.1833 27.9391 42.0458L28.5965 35.2166C28.5998 35.1841 28.6144 35.154 28.639 35.1327L40.7511 24.6216C40.8674 24.5188 40.7344 24.3365 40.6013 24.4159L25.2154 33.6244C25.1629 33.6546 25.1394 33.7183 25.1595 33.7754H25.1584Z"
      fill="#CAD9EC"
    />
    <path
      d="M27.9385 42.0737L44.3184 23.4197L28.6004 35.1662L27.9385 42.0737Z"
      fill="#B2C2D3"
    />
    <g filter="url(#filter0_d_959_5901)">
      <path
        d="M48.1638 48.1641C57.0305 39.2973 57.0305 24.9214 48.1638 16.0547C39.2971 7.18792 24.9213 7.18792 16.0546 16.0547C7.18789 24.9214 7.18789 39.2973 16.0546 48.1641C24.9213 57.0308 39.2971 57.0308 48.1638 48.1641Z"
        fill="#319CE0"
      />
      <path
        d="M19.4335 30.1093L40.6596 21.7453C41.1958 21.5343 41.7537 21.9983 41.6347 22.5567L37.9136 40.0625C37.7758 40.7123 37.0017 40.9999 36.4656 40.6003L27.6649 34.0486L37.7748 25.1888L24.7311 32.8049L19.4675 31.1242C18.9814 30.9692 18.9587 30.296 19.4335 30.1093Z"
        fill="#FDFFFC"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_959_5901"
        x="5.4043"
        y="9.4046"
        width="53.4092"
        height="53.4095"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_959_5901"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_959_5901"
          result="shape"
        />
      </filter>
    </defs>
  </Icon>
);

export default TelegramIcon;
