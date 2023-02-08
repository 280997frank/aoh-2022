import btnFitness from "@/assets/images/soldierStrong/btnFitness.png";
import btnGame from "@/assets/images/soldierStrong/buttonGame.png";
import btnsIntroduction from "@/assets/images/soldierStrong/btnIntroduction.png";
import btnObstacle from "@/assets/images/soldierStrong/btnObstacle.png";
import btnPrehab from "@/assets/images/soldierStrong/btnPrehab.png";
import btnScience from "@/assets/images/soldierStrong/btnScience.png";
import btnshowcase from "@/assets/images/soldierStrong/SoldierShowcase1.png";
import BackButton from "@/components/Atoms/BackButton";
import Hotspot from "@/components/Atoms/Hotspot";
import Layout from "@/components/Template/Layout";
import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  FC,
  useCallback,
  useEffect /*, Touch, useLayoutEffect*/,
  useRef,
  useState,
} from "react";
import { actions as gameActions } from "@/states/game/slice";
import ArrowGuide from "@/components/Atoms/ArrowGuide";
import { useOnClickTracking } from "@/hooks/trackings";

const bgImg =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/soldier-strong%2Fsoldier_strong.jpg?alt=media&token=84828f83-3542-4c22-9875-a4d41f7fd807";
const iconHotspot =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/soldier-strong%2Fhotspot.gif?alt=media&token=54262e89-834e-4fdf-93f7-d004625409a4";
const gameHotspot =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/soldier-strong%2FGame%20Hotspot.gif?alt=media&token=2f2cfa08-1cd4-434d-a287-f5776a9a9c08";

const SoldierStrong: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLargerThan720] = useMediaQuery("(min-width: 721px)");
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");
  const [loaded, setLoaded] = useState(false);

  const loadImg = useCallback(() => {
    if (containerRef.current && imgRef.current) {
      const width = imgRef.current.width;
      if (isLargerThan1180) {
        // min ipad air
        containerRef.current.scrollLeft = 100;
      } else if (isLargerThan720) {
        // min ipad mini
        containerRef.current.scrollLeft = 200;
      } else {
        containerRef.current.scrollLeft = width / 2 - 200;
      }
    }
  }, [containerRef, isLargerThan720, isLargerThan1180]);

  useEffect(() => {
    if (loaded) {
      if (imgRef.current !== null && containerRef.current !== null) {
        if (window.innerWidth < 450) {
          imgRef.current.style.height = `${containerRef.current.clientHeight}px`;
          imgRef.current.style.maxHeight = `unset`;
        } else {
          imgRef.current.style.height = "unset";
          imgRef.current.style.maxHeight = "unset";
        }

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
    }
  }, [loaded, loadImg]);

  const handleOnClickHotspot = (Url: string) => {
    router.push(Url);
  };

  useOnClickTracking({
    isClicked: loaded,
    type: "zones",
    data: {
      slug: "/soldier-strong",
      title: "Soldier Strong",
    },
  });

  return (
    <Layout title="Soldier Strong">
      <Box width="100%" overflowX="auto" height="100%" ref={containerRef}>
        <BackButton
          variant="cream"
          withLabel
          onClick={() => router.push("/")}
          isFloating
        />
        <ArrowGuide color="brand.cream200" />
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
            src={bgImg}
            alt="soldier-strong"
            top="0"
            transition="opacity 1s ease-in-out"
            h="100%"
            w="100%"
          />

          {/* soldiers-showcase */}
          <Hotspot bottom="30%" left="7%">
            <Box display="flex" flexDir="column" alignItems="center">
              <Image
                src={iconHotspot}
                alt="Hotspot"
                cursor="pointer"
                w="50px"
                onClick={() => {
                  handleOnClickHotspot("/soldier-strong/soldiers-showcase");
                }}
              />
              <Image
                src={btnshowcase.src}
                alt="showcase"
                width="auto"
                height="31px"
              />
            </Box>
          </Hotspot>

          {/* soldiers-introduction*/}
          <Hotspot top="42%" left="16.5%">
            <Box display="flex" flexDir="column" alignItems="center">
              <Image
                src={iconHotspot}
                alt="Hotspot"
                cursor="pointer"
                w="50px"
                onClick={() => {
                  handleOnClickHotspot("/soldier-strong/introduction");
                }}
              />
              <Image
                src={btnsIntroduction.src}
                alt="introduction"
                width="auto"
                height="30px"
              />
            </Box>
          </Hotspot>

          {/* soldiers-rehab */}
          <Hotspot bottom="34%" left="27%">
            <Box display="flex" flexDir="column" alignItems="center">
              <Image
                src={iconHotspot}
                alt="Hotspot"
                cursor="pointer"
                w="50px"
                onClick={() => {
                  handleOnClickHotspot("/soldier-strong/soldier-prehab");
                }}
              />
              <Image
                src={btnPrehab.src}
                alt="rehab"
                width="auto"
                height="31px"
              />
            </Box>
          </Hotspot>

          {/* soldiers-Game*/}
          <Hotspot top="44%" left="46.5%">
            <Box display="flex" flexDir="column" alignItems="center">
              <Image
                src={gameHotspot}
                alt="Hotspot"
                cursor="pointer"
                w="50px"
                onClick={() => {
                  dispatch(gameActions.setGame("obstacleCourse"));
                }}
              />
              <Image src={btnGame.src} alt="game" width="auto" height="30px" />
            </Box>
          </Hotspot>

          {/* soldiers-obstacle */}
          <Hotspot bottom="8%" left="49%">
            <Box display="flex" flexDir="column" alignItems="center">
              <Image
                src={iconHotspot}
                alt="Hotspot"
                cursor="pointer"
                w="50px"
                onClick={() => {
                  handleOnClickHotspot("/soldier-strong/obstacles-course");
                }}
              />
              <Image
                src={btnObstacle.src}
                alt="showcase"
                width="auto"
                height="32px"
              />
            </Box>
          </Hotspot>

          {/* soldiers-science*/}
          <Hotspot bottom="40%" right="21%">
            <Box display="flex" flexDir="column" alignItems="center">
              <Image
                src={iconHotspot}
                alt="Hotspot"
                cursor="pointer"
                w="50px"
                onClick={() => {
                  handleOnClickHotspot("/soldier-strong/sports-science");
                }}
              />
              <Image
                src={btnScience.src}
                alt="showcase"
                width="auto"
                height="31px"
              />
            </Box>
          </Hotspot>

          {/* soldiers-fitness */}
          <Hotspot bottom="47%" right="8%">
            <Box display="flex" flexDir="column" alignItems="center">
              <Image
                src={iconHotspot}
                alt="Hotspot"
                cursor="pointer"
                w="50px"
                onClick={() => {
                  handleOnClickHotspot(
                    "/soldier-strong/soldiers-fitness-corner"
                  );
                }}
              />
              <Image
                src={btnFitness.src}
                alt="showcase"
                width="auto"
                height="31px"
              />
            </Box>
          </Hotspot>
        </Box>
      </Box>
    </Layout>
  );
};

export default SoldierStrong;
