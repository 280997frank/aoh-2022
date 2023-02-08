import hotspotCamera from "@/assets/images/hotspot-camera.svg";
import gifHotspot from "@/assets/images/hotspot.gif";
import BackButton from "@/components/Atoms/BackButton";
import Hotspot from "@/components/Atoms/Hotspot";
import Layout from "@/components/Template/Layout";
import ArrowGuide from "@/components/Atoms/ArrowGuide";
import { snapshotOptions } from "@/constants/collection/core";
import { kidsLandingDoc } from "@/constants/collection/kids-zone";
import { Box, Image, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDocumentData } from "react-firehooks";
import { useOnClickTracking } from "@/hooks/trackings";

const KidsZonePage = () => {
  const router = useRouter();
  const toast = useToast();
  const [loaded, setLoaded] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLargerThan720] = useMediaQuery("(min-width: 721px)");
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");

  const [data, loading, error] = useDocumentData(
    kidsLandingDoc,
    snapshotOptions
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
      slug: "/kids-zone",
      title: "Kids Zone",
    },
  });

  return (
    <Layout title="Kids Zone">
      <BackButton
        withLabel
        variant="cream"
        onClick={() => router.push("/")}
        isFloating
      />
      <ArrowGuide />
      <Box width="100%" overflowX="auto" height="100%" ref={boxRef}>
        {/* <Hotspot
          top={{ base: "15%", md: "24%", "2xl": "20%" }}
          left={{ base: "2%", md: "5%", "2xl": "6%" }}
          onClick={() => router.push("/")}
        >
          <BackButton
            withLabel
            variant="cream"
            onClick={() => router.push("/")}
          />
        </Hotspot> */}
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
                alt="kids-zone"
                top="0"
                transition="opacity 1s ease-in-out"
                h="100%"
                w="100%"
              />
              <Hotspot
                top="43%"
                left="21%"
                w="50px"
                onClick={() => router.push("/kids-zone/ig-filter")}
              >
                <Image src={hotspotCamera.src} alt="Hotspot" cursor="pointer" />
              </Hotspot>
              <Hotspot
                top="45%"
                left="12%"
                w="90px"
                rounded="full"
                color="#fff"
                bgColor="#D593C5"
                cursor="default"
              >
                <Text
                  py={1}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="12px"
                >
                  IG FILTER
                </Text>
              </Hotspot>

              <Hotspot
                bottom="39%"
                left="46%"
                w="70px"
                onClick={() => router.push("/kids-zone/colouring-book")}
              >
                <Image src={gifHotspot.src} alt="Hotspot" cursor="pointer" />
              </Hotspot>
              <Hotspot
                bottom="37%"
                left="42%"
                w="200px"
                rounded="full"
                color="#fff"
                bgColor="#D593C5"
                cursor="default"
              >
                <Text
                  py={1}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="12px"
                >
                  VIRTUAL COLOURING BOOK
                </Text>
              </Hotspot>

              <Hotspot
                bottom="33%"
                right="17%"
                w="70px"
                onClick={() => router.push("/kids-zone/gallery")}
              >
                <Image src={gifHotspot.src} alt="Hotspot" cursor="pointer" />
              </Hotspot>
              <Hotspot
                bottom="30%"
                right="16%"
                w="100px"
                rounded="full"
                color="#fff"
                bgColor="#D593C5"
                cursor="default"
              >
                <Text
                  py={1}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="12px"
                >
                  GALLERY
                </Text>
              </Hotspot>
            </Fragment>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default KidsZonePage;
