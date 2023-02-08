import {
  FC,
  useState,
  useRef,
  useEffect /*, Touch, useLayoutEffect*/,
} from "react";
import { Box } from "@chakra-ui/react";
// import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Layout from "@/components/Template/Layout";

import { actions as gameActions } from "@/states/game/slice";

import nightHotspot from "@/assets/images/experienceTheNight/hotspot.gif";
import gameHotspot from "@/assets/images/experienceTheNight/game-hotspot.gif";
import bgImgRepo from "@/assets/images/drone_cage.jpg";
import btnFly from "@/assets/images/droneArena/drone-racer-btn.png";
import btnbring from "@/assets/images/droneArena/btnBring.png";
import BackButton from "@/components/Atoms/BackButton";
import ArrowGuide from "@/components/Atoms/ArrowGuide";
import { useOnClickTracking } from "@/hooks/trackings";
// const bgImg =
//   "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/drone%2Fdrone_cage.jpg?alt=media&token=80ad915e-1f13-45d8-9da9-bdff9665bedd";

const DroneArenaPage: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  let svgRef = useRef<HTMLElement & SVGSVGElement>(null);
  const [loaded, setLoaded] = useState(false);
  // const [isLargerThan720] = useMediaQuery("(min-width: 721px)");
  // const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");
  // const loadImg = useCallback(() => {
  //   if (containerRef.current && svgRef.current) {
  //     const width = containerRef.current?.scrollWidth;
  //     if (isLargerThan1180) {
  //       // min ipad air
  //       containerRef.current.scrollLeft = 100;
  //     } else if (isLargerThan720) {
  //       // min ipad mini
  //       containerRef.current.scrollLeft = 200;
  //     } else {
  //       containerRef.current.scrollLeft = width / 2 - 200;
  //     }
  //   }
  // }, [containerRef, isLargerThan720, isLargerThan1180]);

  useEffect(() => {
    if (loaded) {
      if (svgRef.current !== null && containerRef.current !== null) {
        if (window.innerWidth < 450) {
          const width = containerRef.current?.scrollWidth;
          containerRef.current.scrollLeft = width / 2 - 213;
          svgRef.current.style.height = `${containerRef.current.clientHeight}px`;
          svgRef.current.style.maxHeight = `unset`;
          // containerRef.current.scrollLeft = 450;
        } else {
          svgRef.current.style.height = "unset";
          svgRef.current.style.maxHeight = "unset";
        }
      }
      //  const resizingMap = () => {
      //    if (imgRef.current) {
      //      const temp: HTMLImageElement = new window.Image();
      //      temp.src = imgRef.current.currentSrc;
      //      temp.addEventListener("load", () => {
      //        loadImg();
      //      });
      //    }
      //  };

      //  window.addEventListener("resize", resizingMap, false);
      //  return () => {
      //    window.removeEventListener("resize", resizingMap, false);
      //  };
    }
  }, [loaded]);
  // console.log("svgRef", svgRef.current);
  // console.log("containerRef.current", containerRef.current?.scrollWidth);

  useOnClickTracking({
    isClicked: loaded,
    type: "zones",
    data: {
      slug: "/drone-arena",
      title: "Drone Arena",
    },
  });

  return (
    <Layout title="Drone Arena">
      <BackButton
        variant="cream"
        onClick={() => router.push("/")}
        isFloating
        withLabel
      />
      <ArrowGuide color="brand.cream200" />
      <Box
        m="0"
        p="0"
        left="0"
        right="0"
        top="0"
        pos="relative"
        overflowX="auto"
        overflowY={{ base: "hidden", md: "auto" }}
        ref={containerRef}
        width="100% !important"
        height="100%"
      >
        {/* <Button
          position="fixed"
          top={{ base: "15%", md: "27%", "2xl": "20%" }}
          left={{ base: "2%", md: "5%", "2xl": "6%" }}
          bg="transparent"
          color="#E7E6D0"
          _focus={{ backgroundColor: "transparent" }}
          _hover={{ backgroundColor: "transparent" }}
          _active={{ backgroundColor: "transparent" }}
          textAlign="center"
          verticalAlign="center"
          height="40px"
          lineHeight="40px"
          id="backButton"
          onClick={() => router.push("/")}
        >
          <IoIosArrowDropleftCircle size="40px" color={"#E7E6D0"} />
          <Text
            ml={{ base: "0", md: "5px" }}
            mt="3px"
            display={{ base: "none", md: "block" }}
          >
            BACK
          </Text>
        </Button> */}
        <svg
          ref={svgRef}
          id="svg-img-drone"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onLoad={() => setLoaded(true)}
        >
          <image
            xlinkHref={bgImgRepo.src}
            style={{
              // objectFit: "cover",
              // objectPosition: "center",
              width: "auto",
              height: "100%",
            }}
          />
          {/* fly a drone */}
          <image
            xlinkHref={gameHotspot.src}
            x="400"
            y="490"
            style={{
              width: "90px",
            }}
            onClick={() => {
              dispatch(gameActions.setGame("droneFlying"));
            }}
          />

          <image
            xlinkHref={btnFly.src}
            x="370"
            y="570"
            style={{
              width: "auto",
            }}
          />

          {/* bring a drone */}
          <image
            xlinkHref={nightHotspot.src}
            x="1450"
            y="490"
            style={{
              width: "90px",
            }}
            onClick={() => {
              router.push("/drone-arena/bring-your-own-drone");
            }}
          />

          <image
            xlinkHref={btnbring.src}
            x="1370"
            y="570"
            style={{
              width: "auto",
            }}
          />
        </svg>
      </Box>
    </Layout>
  );
};

export default DroneArenaPage;
