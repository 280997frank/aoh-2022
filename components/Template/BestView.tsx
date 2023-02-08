import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  isMobileOnly,
  isTablet,
  useMobileOrientation,
  isAndroid,
} from "react-device-detect";

import BestViewIcon from "@/assets/images/bestview.png";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { actions as fullscreenAction } from "@/states/fullscreen/slice";
import { actions as placeholderAction } from "@/states/placeholder/slice";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

interface BestViewProps {
  children: ReactNode;
}

const excludePages = ["/register"];

const BestView: FC<BestViewProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const { isLandscape, isPortrait } = useMobileOrientation();
  // const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [fullscreen, setFullscreen] = useState(false);
  const isKeyboardOpen = useDetectKeyboardOpen();

  const isSamsungFold =
    window.innerHeight === 664 &&
    window.innerWidth === 674 &&
    window.screen.height === 842 &&
    window.screen.width === 674;

  useEffect(() => {
    const video = document.querySelector("video");

    document.addEventListener("webkitfullscreenchange", () => {
      dispatch(fullscreenAction.setStream(!fullscreen));
      setFullscreen(!fullscreen);
    });

    if (video && video.className != "landing-video") {
      video.onpause = () => {
        dispatch(fullscreenAction.setStream(false));
      };

      video.onended = () => {
        dispatch(fullscreenAction.setStream(false));
      };

      video.onplay = () => {
        dispatch(fullscreenAction.setStream(true));
      };
    }
  });

  const { isFullscreenVideo, isFocus } = useSelector(
    (state: RootState) => ({
      isFullscreenVideo: state.fullscreenVideo.isFullScreenVideo,
      isFocus: state.placeholder.isFocus,
    }),
    shallowEqual
  );

  useEffect(() => {
    console.log({ isPortrait, isMobileOnly, isKeyboardOpen, isAndroid });
  }, [isKeyboardOpen, isPortrait]);

  // console.log(pathname);

  // const [isPortrait] = useMediaQuery(["(orientation: portrait)"]);
  // console.log(isPortrait, isLandscape, isMobileOnly, isTablet);

  // there's isPortrait bug.
  // isPortrait will set to false when soft-keyboard appeared
  // check if soft-keyboard is shown to be safe
  if (
    (isPortrait && isMobileOnly) ||
    (isAndroid && isKeyboardOpen) ||
    isFullscreenVideo ||
    isFocus ||
    excludePages.indexOf(pathname) > -1
  ) {
    return <>{children}</>;
  } else if (isSamsungFold) {
    return <>{children}</>;
  } else if ((isLandscape && isTablet) || isFullscreenVideo) {
    return <>{children}</>;
  } else if (screen.width >= 1280 || isFullscreenVideo) {
    return <>{children}</>;
  } else {
    return (
      <Box position="fixed" left="0" top="0" w="100vw" h="100vh">
        <Flex
          h="100%"
          flexDir="column"
          backgroundColor="#2E4924"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontWeight="bold"
            color="white"
            fontSize={{ base: "24px", lg: "2rem" }}
          >
            PLEASE ROTATE YOUR DEVICE
          </Text>
          <Image
            my={{ base: "2rem", lg: "5rem" }}
            w={{ base: "8rem", lg: "15rem" }}
            src={BestViewIcon.src}
            alt="best view icon"
          />
          <Text color="white" fontSize={{ base: "14px", lg: "1.5rem" }}>
            For best experience, please turn
          </Text>
          <Text color="white" fontSize={{ base: "14px", lg: "1.5rem" }}>
            {`your device to ${isPortrait ? "landscape" : "portrait"} mode`}
          </Text>
        </Flex>
      </Box>
    );
  }
};

export default BestView;
