import React, { ReactElement, useState, useRef, useEffect } from "react";
import Vimeo from "@u-wave/react-vimeo";
import Youtube from "@u-wave/react-youtube";
import s from "shortid";
import { AspectRatio, Box, Spinner, useMediaQuery } from "@chakra-ui/react";
import { ResponsiveValue } from "@chakra-ui/react";
import cx from "classnames";

interface HtmlVideo {
  src: string;
  type: string;
}

interface VideoPlayerProps {
  onStateChange: (playState: boolean) => void;
  videoId: string;
  htmlVideos?: HtmlVideo[];
  platform: string;
  autoPlay: boolean;
  controls: boolean;
  width?: string;
  height?: string;
  loop?: boolean;
  muted?: boolean;
  isFloating?: boolean;
  aspectRatio?: ResponsiveValue<number> | undefined;
  urlVideo?: string;
}

declare global {
  interface Window {
    dacast: (
      videoId: string,
      elementId: string,
      options: any
    ) => {
      onPause: Function;
      onPlay: Function;
      onComplete: Function;
    };
  }
}

const VideoPlayer = ({
  onStateChange,
  videoId,
  htmlVideos,
  platform,
  autoPlay,
  controls,
  width,
  height,
  loop,
  muted,
  aspectRatio = 16 / 9,
  isFloating = false,
  urlVideo,
}: VideoPlayerProps): ReactElement => {
  let videoPlayer = null;
  const [paddingTop, setPaddingTop] = useState<string | number>(0);
  const videoRef = useRef<HTMLElement>(null);
  const [updateHeight, setUpdateHeight] = useState(0);
  // console.log("isFloating", isFloating);

  useEffect(() => {
    if (platform === "dacast" && videoId !== "") {
      const myPlayer = window.dacast(videoId, "dacast", {
        player: "theo",
      });
      myPlayer.onPause(() => {
        onStateChange(false);
        // console.log("ini pause");
      });
      myPlayer.onPlay(() => {
        onStateChange(true);
        // console.log("ini play");
      });
      myPlayer.onComplete(() => {
        onStateChange(false);
        // console.log("ini End");
      });
    }
  }, [videoId, onStateChange, platform]);

  switch (platform) {
    case "dacast":
      videoPlayer = (
        <Box
          id="streamplayer"
          style={{ width: width ?? "unset", height: height ?? "unset" }}
          position={isFloating ? "fixed" : "unset"}
          top={isFloating ? "3rem" : "auto"}
          zIndex={isFloating ? "999" : "1"}
          right={isFloating ? "0%" : "auto"}
        >
          {videoId.length > 0 ? (
            <AspectRatio
              ratio={aspectRatio}
              bgColor={isFloating ? "transparent" : "black"}
              // h={{ base: "82vh", md: "80vh" }}
            >
              <figure ref={videoRef}>
                <div id="dacast" className="dacast-video" />
                {/* <iframe
                  id="dacast"
                  title="PSTA-2021"
                  src={urlVideo}
                  allowFullScreen
                  // allow="autoplay"
                  height="100%"
                  width="100%"
                /> */}
              </figure>
            </AspectRatio>
          ) : (
            <Spinner />
          )}
        </Box>
      );
      break;
    case "youtube":
      videoPlayer = (
        <Box
          id="streamplayer"
          // className={isFloating ? "is-sticky" : ""}
          style={{ width: width ?? "unset", height: height ?? "unset" }}
          position={isFloating ? "fixed" : "unset"}
          top={isFloating ? "3rem" : "auto"}
          zIndex={isFloating ? "999" : "1"}
          right={isFloating ? "0%" : "auto"}
        >
          {videoId.length > 0 ? (
            <figure ref={videoRef}>
              <AspectRatio
                ratio={aspectRatio}
                bgColor={isFloating ? "transparent" : "black"}
              >
                <Youtube
                  video={videoId}
                  onPlaying={() => onStateChange(true)}
                  onEnd={() => {
                    onStateChange(false);
                  }}
                  onPause={() => onStateChange(false)}
                  autoplay={autoPlay}
                  onReady={() => setUpdateHeight(updateHeight + 1)}
                />
              </AspectRatio>
            </figure>
          ) : (
            <Spinner />
          )}
        </Box>
      );
      break;
    case "vimeo":
      videoPlayer = (
        <Box
          id="streamplayer"
          style={{ width: width ?? "unset", height: height ?? "unset" }}
          position={isFloating ? "fixed" : "unset"}
          top={isFloating ? "3rem" : "auto"}
          zIndex={isFloating ? "999" : "1"}
          right={isFloating ? "0%" : "auto"}
        >
          {videoId.length > 0 ? (
            <figure ref={videoRef}>
              <AspectRatio
                ratio={aspectRatio}
                bgColor={isFloating ? "transparent" : "black"}
              >
                <Vimeo
                  video={videoId}
                  onPlay={() => onStateChange(true)}
                  onEnd={() => {
                    onStateChange(false);
                  }}
                  controls={controls}
                  muted={muted}
                  loop={loop}
                  onPause={() => onStateChange(false)}
                  autoplay={autoPlay}
                  onReady={() => setUpdateHeight(updateHeight + 1)}
                />
              </AspectRatio>
            </figure>
          ) : (
            <Spinner />
          )}
        </Box>
      );
      break;
    default:
      videoPlayer = (
        <Box
          id="streamplayer"
          style={{ width: width ?? "unset", height: height ?? "unset" }}
          position={isFloating ? "fixed" : "unset"}
          top={isFloating ? "3rem" : "auto"}
          zIndex={isFloating ? "999" : "1"}
          right={isFloating ? "0%" : "auto"}
        >
          {Array.isArray(htmlVideos) && htmlVideos.length > 0 ? (
            <figure ref={videoRef} style={{ paddingTop }}>
              <AspectRatio
                ratio={aspectRatio}
                bgColor={isFloating ? "transparent" : "black"}
              >
                <video
                  autoPlay={autoPlay}
                  preload=""
                  playsInline
                  controls={controls}
                  muted={false}
                  controlsList="nodownload"
                  onEnded={() => onStateChange(false)}
                  onLoadedData={(e) => {
                    const { videoHeight, videoWidth } = e.currentTarget;
                    const padTop = (videoHeight * 100) / videoWidth;

                    // setPaddingTop(`${padTop}%`);

                    setUpdateHeight(updateHeight + 1);
                  }}
                >
                  {Array.isArray(htmlVideos) &&
                    htmlVideos.map(({ src, type }) => (
                      <source key={s.generate()} src={src} type={type} />
                    ))}
                  <h1>{`Your browser doesn't support HTML native videos.`}</h1>
                </video>
              </AspectRatio>
            </figure>
          ) : (
            <Spinner />
          )}
        </Box>
      );
  }

  return videoPlayer;
};

VideoPlayer.defaultProps = {
  onStateChange: () => {},
  autoPlay: true,
  className: "",
  controls: true,
  videoId: "",
  platform: "",
  loop: false,
  muted: false,
};

export default VideoPlayer;
