import Button from "@/components/Atoms/Button";
import SwiperPhotobooth from "@/components/Molecules/SwiperPhotobooth";
import { snapshotOptions } from "@/constants/collection/core";
import { photoboothPlatformsDoc } from "@/constants/collection/photobooth";
import { useOnClickTracking } from "@/hooks/trackings";
import { useWindowSize } from "@/hooks/windowSize";
import { TPhotoboothSnapProps } from "@/types/photobooth";
import { Box, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDocumentData } from "react-firehooks";
import Webcam from "react-webcam";

const HEADER_BASED_ON_TIMER = ["SMILE", "POSE", "GET READY"];
const VIDEO_CONSTRAINT = {
  width: 720,
  height: 1080,
  aspectRatio: 1,
  facingMode: "user",
};

const PhotoboothSnap: TPhotoboothSnapProps = ({ onNextSection }) => {
  const toast = useToast();
  const [frame, setFrame] = useState("");
  const [isTakeSelfie, setIsTakeSelfie] = useState(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isShowTimer, setIsShowTimer] = useState(false);
  const [frameSize, setFrameSize] = useState<number>(300);
  const [timer, setTimer] = useState(3);
  const windowSize = useWindowSize();
  const webcamRef = useRef<any>(null);

  const [data, loading, error] = useDocumentData(
    photoboothPlatformsDoc,
    snapshotOptions
  );

  const onSelectFrame = (index: number) => {
    if (data) {
      const { frame } = data?.platforms[index];
      setFrame(frame);
    }
  };

  const startTimer = () => {
    let timeleft = 3;
    setIsShowTimer(true);
    const captureTimer = setInterval(function () {
      setTimer(timeleft);
      if (timeleft <= 0) {
        clearInterval(captureTimer);
        setIsShowTimer(false);
        setTimer(3);
        const imageCaptured = webcamRef.current.getScreenshot();
        onNextSection({
          frame,
          imageCaptured,
        });
      }
      timeleft -= 1;
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      const { platforms } = data;
      setFrame(platforms[0].frame);
      const tempAvatars = platforms.map(({ avatar }) => avatar);
      setAvatars(tempAvatars);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Copy Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleResize = useCallback(() => {
    if (windowSize.height <= 570) {
      setFrameSize(205);
    } else if (windowSize.height <= 680) {
      setFrameSize(225);
    } else {
      setFrameSize(300);
    }
  }, [windowSize]);

  useEffect(() => {
    handleResize();
  }, [windowSize, handleResize]);

  useOnClickTracking({
    data: {
      slug: "/our-army-platforms",
      title: "Take a Selfie",
    },
    isClicked: isTakeSelfie,
    type: "take-a-selfie",
  });

  useEffect(() => {
    if (isTakeSelfie) {
      setIsTakeSelfie(false);
    }
  }, [isTakeSelfie]);

  return (
    <Fragment>
      {data && (
        <Box className="content" width="86%" height="100%" margin="0 auto">
          <Flex
            marginTop="40px"
            flexDir="column"
            gridGap={6}
            justifyContent="center"
            alignItems="center"
          >
            <Heading
              color="brand.green"
              as="h2"
              fontSize="24px"
              lineHeight="23px"
              textAlign="center"
              marginBottom={6}
            >
              {!isShowTimer
                ? "CHOOSE A VEHICLE"
                : HEADER_BASED_ON_TIMER[timer - 1]}
            </Heading>
            <Flex
              position="relative"
              display="flex"
              flexDirection="column"
              alignItems="center"
              width={frameSize}
              height={frameSize}
            >
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={480}
                height={720}
                videoConstraints={VIDEO_CONSTRAINT}
                forceScreenshotSourceSize={true}
                mirrored={true}
                style={{
                  borderRadius: "23px",
                }}
              />
              <Image
                src={frame}
                alt="test"
                position="absolute"
                width={300}
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
              />
              <Box
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                visibility={isShowTimer ? "visible" : "hidden"}
              >
                <Text fontSize="9xl" fontWeight="bold" color="white">
                  {timer}
                </Text>
              </Box>
            </Flex>
            {avatars.length > 0 && (
              <Box px={4} width="100%">
                <SwiperPhotobooth avatars={avatars} onClick={onSelectFrame} />
              </Box>
            )}
            <Box width="300px">
              <Button
                bgColor="brand.jaffa"
                onClick={() => {
                  setIsTakeSelfie(true);
                  startTimer();
                }}
                disabled={isShowTimer}
              >
                NEXT
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </Fragment>
  );
};

export default PhotoboothSnap;
