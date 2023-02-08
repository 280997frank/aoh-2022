import { FC, useEffect, useState, useRef, Touch, useCallback } from "react";
import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@/components/Template/Layout";
import zone1 from "@/assets/images/ns55-showcase/zone1-showcase.png";
import Hotspot from "@/components/Atoms/Hotspot";
import BackButton from "@/components/Atoms/BackButton";
import ArrowGuide from "@/components/Atoms/ArrowGuide";
import { useOnClickTracking } from "@/hooks/trackings";

const Nss5ShowcaseZone1: FC = () => {
  const [isLargerThan720] = useMediaQuery("(min-width: 721px)");
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

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

  useOnClickTracking({
    isClicked: loaded,
    type: "zones",
    data: {
      slug: "/ns55-showcase/zone-1",
      title: "NS 55 Showcase Zone 1",
    },
  });

  return (
    <Layout title="NS55 Showcase">
      <BackButton
        onClick={() => router.push("/ns55-showcase")}
        withLabel
        variant="cream"
        isFloating
      />
      <ArrowGuide />
      <Box width="100%" overflowX="auto" height="100%" ref={boxRef}>
        <Box
          position="relative"
          minWidth="1400px"
          width="100%"
          height={{
            base: "100%",
            md: "auto",
          }}
          overflow="hidden"
        >
          <Image
            ref={imgRef}
            src={zone1.src}
            alt="NS Through Generations"
            top="0"
            transition="opacity 1s ease-in-out"
            w="100%"
            h="100%"
            onLoad={() => setLoaded(true)}
          />
          <Hotspot
            top="92%"
            left="6%"
            label="BACKGROUND OF NS"
            onClick={() =>
              router.push("/ns55-showcase/zone-1/background-of-ns")
            }
          />
          <Hotspot
            top="82%"
            left="23%"
            label="JOURNEY OF OUR NSMEN"
            onClick={() =>
              router.push("/ns55-showcase/zone-1/journey-of-our-nsmen")
            }
          />
          <Hotspot
            top="87%"
            left="55%"
            label="PILLAR OF STRENGTH"
            onClick={() =>
              router.push("/ns55-showcase/zone-1/pillar-of-strength")
            }
          />
          <Hotspot
            top="62%"
            left="72%"
            label="OUR G.E.A.R.S OVER THE YEARS"
            onClick={() =>
              router.push("/ns55-showcase/zone-1/our-gears-over-the-years")
            }
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Nss5ShowcaseZone1;
