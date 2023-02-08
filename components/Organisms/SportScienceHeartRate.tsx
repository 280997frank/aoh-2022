import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Image,
  Img,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { FC, ReactElement } from "react";
import ContentDetail from "@/components/Molecules/ContentDetail";
import { useVideo } from "@/utils";
import VideoPlayer from "../Atoms/VideoPlayer";
import isNil from "lodash/isNil";
interface Tprops {
  data: {
    title: string;
    content: {
      title: string;
      url: string;
      type: string;
      desc: string;
    };
  };
}
interface RenderVideoPlayerProps {
  videoURL: string;
}

const RenderVideoPlayer = ({
  videoURL,
}: RenderVideoPlayerProps): ReactElement => {
  const convertedVideo = useVideo(videoURL);
  // console.log("convertedVideo", convertedVideo);

  return (
    <VideoPlayer
      videoId={convertedVideo.id}
      platform={convertedVideo.platform}
      htmlVideos={convertedVideo.htmlVideos}
      urlVideo={videoURL}
      controls
      autoPlay={false}
      width="100%"
      height="100%"
    />
  );
};

const SportScienceHeartRate: FC<Tprops> = ({ data }) => {
  return (
    <Stack
      pt={{
        base: "3rem",
        md: "4rem",
      }}
      pb={{
        base: "2rem",
        md: "4rem",
      }}
      direction="column"
    >
      <Heading
        fontSize={{ base: "20px", md: "30px" }}
        color="brand.green"
        textAlign="center"
        textTransform="uppercase"
        pb={{
          base: "2rem",
          md: "3rem",
        }}
      >
        {data?.title}
      </Heading>
      <Box>
        <ContentDetail title={data?.content.title} color="brand.crete">
          {!isNil(data.content.url) &&
            data.content.url !== "" &&
            data.content.type === "video" && (
              <RenderVideoPlayer videoURL={data.content.url} />
            )}
          {!isNil(data.content.url) &&
            data.content.url !== "" &&
            data.content.type === "image" && (
              <AspectRatio ratio={16 / 9}>
                <Img
                  src={data.content.url}
                  width="100%"
                  alt={data.content.url}
                />
              </AspectRatio>
            )}
        </ContentDetail>
        <Box pt="10">
          {!isNil(data.content.desc) && (
            <Text
              color="brand.green"
              pr={{
                base: "5",
                md: "0px",
              }}
              pl={{
                base: "5",
                md: "0px",
              }}
              dangerouslySetInnerHTML={{
                __html: data.content.desc || "",
              }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default SportScienceHeartRate;
