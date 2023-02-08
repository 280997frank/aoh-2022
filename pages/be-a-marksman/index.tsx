import hotspotGame from "@/assets/images/hotspot-game.svg";
import hotspot from "@/assets/images/hotspot.svg";
import ArrowGuide from "@/components/Atoms/ArrowGuide";
import BackButton from "@/components/Atoms/BackButton";
import Hotspot from "@/components/Atoms/Hotspot";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { useOnClickTracking } from "@/hooks/trackings";
import { actions as gameActions } from "@/states/game/slice";
import { Box, Image, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDocumentData } from "react-firehooks";
import { useDispatch } from "react-redux";

const marksmanCollection = collection(
  db,
  "be-a-marksman"
) as CollectionReference<{
  image: string;
}>;

const BeAMarksman = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const [loaded, setLoaded] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLargerThan720] = useMediaQuery("(min-width: 721px)");
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");

  const [data, loading, error] = useDocumentData(
    doc(marksmanCollection, "landing"),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );

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

  useOnClickTracking({
    isClicked: loaded,
    type: "zones",
    data: {
      slug: "/be-a-marksman",
      title: "Be A Marksman",
    },
  });

  return (
    <Layout title="Be A Marksman">
      <BackButton
        withLabel
        variant="cream"
        onClick={() => router.push("/")}
        isFloating
      />
      <ArrowGuide color="brand.cream200" />
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
          {data && (
            <Fragment>
              <Image
                src={data?.image}
                ref={imgRef}
                onLoad={() => setLoaded(true)}
                alt="be-a-marksman"
                top="0"
                transition="opacity 1s ease-in-out"
                h="100%"
                w="100%"
              />
              <Hotspot
                top="45%"
                left="24%"
                w="60px"
                onClick={() => dispatch(gameActions.setGame("sar21Shooting"))}
              >
                <Image src={hotspotGame.src} alt="" cursor="pointer" />
              </Hotspot>
              <Hotspot
                top="54%"
                left="19.5%"
                w="180px"
                rounded="full"
                color="#fff"
                bgColor="#AB7D55"
                cursor="default"
              >
                <Text
                  py={1.5}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="12px"
                >
                  WATCH YOUR FRONT!
                </Text>
              </Hotspot>
              <Hotspot
                bottom="48%"
                right="26.5%"
                w="60px"
                onClick={() => router.push("/be-a-marksman/fire-fight")}
              >
                <Image src={hotspot.src} alt="Hotspot" />
              </Hotspot>
              <Hotspot
                bottom="44%"
                right="22%"
                w="200px"
                rounded="full"
                color="#fff"
                bgColor="#AB7D55"
                cursor="default"
              >
                <Text
                  py={1.5}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="12px"
                >
                  BE A MARKSMAN
                </Text>
              </Hotspot>
            </Fragment>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default BeAMarksman;
