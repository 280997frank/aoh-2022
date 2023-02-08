import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import gameHotspot from "@/assets/images/experienceTheNight/game-hotspot.gif";
import nightHotspot from "@/assets/images/experienceTheNight/night-hotspot.gif";
import nightVisionOff from "@/assets/images/experienceTheNight/night-vision-off.jpg";
import nightVisionOn from "@/assets/images/experienceTheNight/night-vision-on.jpg";
import Hotspot from "@/components/Atoms/Hotspot";
import Layout from "@/components/Template/Layout";
import { useExperienceTheNightCopyWritings } from "@/hooks/experienceTheNight";
import { actions as gameActions } from "@/states/game/slice";
import {
  Box,
  CloseButton,
  Heading,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import BackButton from "@/components/Atoms/BackButton";
import ArrowGuide from "@/components/Atoms/ArrowGuide";
import { useOnClickTracking } from "@/hooks/trackings";

const ExperienceTheNightPage: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isNightVisionOn, setNightVisionOn] = useState(false);
  const { copyWritings, loading } = useExperienceTheNightCopyWritings();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLargerThan720] = useMediaQuery("(min-width: 721px)");
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isNightVisionOn && !isOpen) {
      setTimeout(() => {
        onOpen();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNightVisionOn]);

  const loadImg = useCallback(() => {
    if (boxRef.current && imgRef.current) {
      const width = imgRef.current.width;
      if (isLargerThan1180) {
        // min ipad air
        boxRef.current.scrollLeft = 100;
      } else if (isLargerThan720) {
        // min ipad mini
        boxRef.current.scrollLeft = 200;
      } else {
        boxRef.current.scrollLeft = width / 2 - 200;
      }
    }
  }, [boxRef, isLargerThan720, isLargerThan1180]);

  useEffect(() => {
    if (loaded) {
      const resizingMap = () => {
        if (imgRef.current) {
          const temp: HTMLImageElement = new window.Image();
          temp.src = imgRef.current.currentSrc;
          temp.addEventListener("load", () => {
            loadImg();
          });
        }
      };

      resizingMap();
      window.addEventListener("resize", resizingMap, false);
      return () => {
        window.removeEventListener("resize", resizingMap, false);
      };
    }
  }, [loaded, loadImg]);

  return (
    <Layout title="Experience The Night">
      <BackButton
        withLabel
        onClick={() => router.push("/")}
        variant="cream"
        labelColor="brand.cream200"
        isFloating
      />
      <ArrowGuide />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        display={isOpen ? "block" : "none"}
        w={{ base: "85%", md: "unset" }}
        zIndex="modal"
      >
        <CloseButton
          rounded="full"
          color="white"
          position="absolute"
          right={{ base: "0px", md: "-25px" }}
          top="-25px"
          size="sm"
          sx={{
            bgColor: "#C0BE9A !important",
            shadow: "none !important",
          }}
          onClick={onClose}
        />
        <Stack
          spacing={5}
          bgColor="blackAlpha.700"
          border="1px"
          borderColor="#FBFAE5"
          rounded="2xl"
          textAlign="center"
          px={10}
          py={{ base: 10, md: 20 }}
          color="white"
          alignItems="center"
        >
          <Heading size="lg">
            <Skeleton isLoaded={!loading}>{copyWritings.title}</Skeleton>
          </Heading>
          <Skeleton isLoaded={!loading}>
            <Text>{copyWritings.description}</Text>
          </Skeleton>
          {/* <Button px={20} rounded="full" color="#fff" bgColor="#636666">
              <Skeleton isLoaded={!loading}>{copyWritings.button}</Skeleton>
            </Button> */}
        </Stack>
      </Box>
      <Box width="100%" overflowX="auto" height="100%" ref={boxRef}>
        <Box
          position="relative"
          minWidth="1400px"
          width="100%"
          height={{
            base: "100%",
            md: "auto",
          }}
        >
          <Image
            ref={imgRef}
            onLoad={() => setLoaded(true)}
            transition="opacity 1.5s ease-in-out"
            src={nightVisionOn.src}
            alt="Night Vision On"
            opacity={isNightVisionOn ? 1 : 0}
            h="100%"
            w="100%"
          />
          <Image
            ref={imgRef}
            onLoad={() => setLoaded(true)}
            position="absolute"
            top="0"
            transition="opacity 1s ease-in-out"
            src={nightVisionOff.src}
            alt="Night Vision Off"
            opacity={isNightVisionOn ? 0 : 1}
            h="100%"
            w="100%"
          />
          <Hotspot
            bottom="2rem"
            left="4%"
            w="70px"
            onClick={() => setNightVisionOn((prev) => !prev)}
            position="fixed"
          >
            <Image
              src={nightHotspot.src}
              alt="Night Vision Hotspot"
              cursor="pointer"
            />
          </Hotspot>
          <Hotspot
            bottom="3rem"
            left={{ base: "50%", md: "calc(4% + 70px)" }}
            transform={{ base: "translateX(-50%)", md: "unset" }}
            w={{ base: "calc(100% - 180px)", md: "200px" }}
            rounded="full"
            color="#fff"
            bgColor="#636666"
            onClick={() => setNightVisionOn((prev) => !prev)}
            position="fixed"
          >
            <Text py={1.5} textAlign="center" fontWeight="bold">
              NIGHT MODE {isNightVisionOn ? "ON" : "OFF"}
            </Text>
          </Hotspot>
          <Hotspot
            bottom="2rem"
            right="4%"
            w="70px"
            onClick={() => dispatch(gameActions.setGame("spotSoldier"))}
            position="fixed"
          >
            <Image
              src={gameHotspot.src}
              alt="Night Vision Hotspot"
              cursor="pointer"
            />
          </Hotspot>
        </Box>
      </Box>
    </Layout>
  );
};

export default ExperienceTheNightPage;
