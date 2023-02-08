import { AspectRatio, Box, Stack, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const Landing = () => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  return (
    <Stack w={"100vw"} h="100%">
      {isDesktop ? (
        <AspectRatio ratio={16 / 9}>
          <video
            className="landing-video"
            autoPlay
            loop
            muted
            src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2FAOH%20desktop%20landing%20Page%20b.mp4?alt=media&token=1526f009-5d77-44f7-a290-77d06a8c2cd2"
            controlsList="nodownload"
          />
        </AspectRatio>
      ) : (
        <AspectRatio ratio={9 / 16}>
          <video
            className="landing-video"
            autoPlay
            loop
            muted
            playsInline
            src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2Fmobile-landing.mp4?alt=media&token=f7887f67-7058-410e-934f-722992ff01cf"
            controlsList="nodownload"
          />
        </AspectRatio>
      )}
    </Stack>
  );
};

export default Landing;
