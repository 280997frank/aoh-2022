import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Avenir Next";
        font-style: normal;
        font-weight: normal;
        src: local("AvenirNext LT Pro Regular"), url("/fonts/AvenirNextLTPro-Regular.otf") format("opentype");
        font-display: swap;
      }

      @font-face {
        font-family: "Avenir Next";
        font-style: normal;
        font-weight: bold;
        src: local("AvenirNext LT Pro Bold"), url("/fonts/AvenirNextLTPro-Bold.otf") format("opentype");
        font-display: swap;
      }

      @font-face {
        font-family: "Avenir Next";
        font-style: italic;
        font-weight: normal;
        src: local("AvenirNext LT Pro Regular"), url("/fonts/AvenirNextLTPro-It.otf") format("opentype");
        font-display: swap;
      }
      `}
  />
);

export default Fonts;
