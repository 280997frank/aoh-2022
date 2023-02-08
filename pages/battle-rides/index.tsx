import { FC, useEffect, useCallback, useState, useRef } from "react";
import { Box, Link, useMediaQuery } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import Layout from "@/components/Template/Layout";

import { actions as gameActions } from "@/states/game/slice";
import BackButton from "@/components/Atoms/BackButton";
import battleRides from "@/assets/images/battleRides/background-battle-rides.jpg";
import hotspotIco from "@/assets/images/battleRides/hotspot.gif";
import GameIcon from "@/assets/icons/BattleRides/GameIcon";
import GamePlayBtn from "@/assets/icons/BattleRides/GamePlayBtn";
import ChinookBtn from "@/assets/icons/BattleRides/ChinookBtn";
import PrvBtn from "@/assets/icons/BattleRides/PrvBtn";
import M3gBtn from "@/assets/icons/BattleRides/M3gBtn";
import TerrexBtn from "@/assets/icons/BattleRides/TerrexBtn";
import BionixBtn from "@/assets/icons/BattleRides/BionixBtn";
import { useRouter } from "next/router";
import ArrowGuide from "@/components/Atoms/ArrowGuide";
import { useOnClickTracking } from "@/hooks/trackings";

const BattleRides: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [containerEle, setContainerEle] = useState<HTMLElement | null>(null);
  const [svgEle, setSvgEle] = useState<HTMLElement | SVGSVGElement | null>(
    null
  );
  const [isLargerThan720] = useMediaQuery("(min-width: 721px)");
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");

  const resizeEvent = useCallback(
    (
      svg: HTMLElement | SVGSVGElement | null,
      container: HTMLElement | null
    ) => {
      if (container && svg) {
        // console.log(svg.clientWidth, svg.scrollWidth);
        if (window.innerWidth < 450) {
          svg.style.height = `${container.clientHeight}px`;
          svg.style.maxHeight = `unset`;
        } else {
          svg.style.height = "unset";
          svg.style.maxHeight = "unset";
        }

        if (isLargerThan1180) {
          // min ipad air
          container.scrollLeft = 100;
        } else if (isLargerThan720) {
          // min ipad mini
          container.scrollLeft = 200;
        } else {
          container.scrollLeft = svg.clientWidth / 2 - 200;
        }
      }
    },
    [isLargerThan1180, isLargerThan720]
  );

  useEffect(() => {
    resizeEvent(svgEle, containerEle);
    if (containerEle) {
      setTimeout(() => {
        containerEle.scrollTo({
          top: containerEle.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    }
    window.addEventListener(
      "resize",
      () => resizeEvent(svgEle, containerEle),
      false
    );
    return () => {
      window.removeEventListener(
        "resize",
        () => resizeEvent(svgEle, containerEle),
        false
      );
    };
  }, [containerEle, resizeEvent, svgEle]);

  useOnClickTracking({
    isClicked: svgEle !== null,
    type: "zones",
    data: {
      slug: "/battle-rides",
      title: "Battle Rides",
    },
  });

  return (
    <Layout title="Experience The Night">
      <BackButton
        withLabel
        variant="cream"
        onClick={() => router.push("/")}
        isFloating
      />
      <ArrowGuide />
      <Box
        m="0"
        p="0"
        left="0"
        right="0"
        top="0"
        pos="relative"
        overflowX="auto"
        overflowY={{ base: "hidden", md: "auto" }}
        ref={setContainerEle}
        width="100vw"
        height="100%"
      >
        <svg
          ref={setSvgEle}
          id="svg-img-battle-rides"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            xlinkHref={battleRides.src}
            style={{
              width: "auto",
              height: "100%",
            }}
          />
          {/* Terrex */}
          <Link href="/battle-rides/terrex">
            <image
              xlinkHref={hotspotIco.src}
              x="350"
              y="810"
              style={{
                width: "90px",
              }}
            />
          </Link>
          <TerrexBtn />

          {/* bionix */}
          <Link href="/battle-rides/bionix">
            <image
              xlinkHref={hotspotIco.src}
              x="590"
              y="810"
              style={{
                width: "90px",
              }}
            />
          </Link>
          <BionixBtn />
          {/* PRV */}
          <Link href="/battle-rides/prv">
            <image
              xlinkHref={hotspotIco.src}
              x="860"
              y="810"
              style={{
                width: "90px",
              }}
            />
          </Link>
          <PrvBtn />

          {/* M3G */}
          <Link href="/battle-rides/m3g">
            <image
              xlinkHref={hotspotIco.src}
              x="1090"
              y="810"
              style={{
                width: "90px",
              }}
            />
          </Link>
          <M3gBtn />
          {/* chinook */}
          <Link href="/battle-rides/chinook">
            <image
              xlinkHref={hotspotIco.src}
              x="1230"
              y="912"
              style={{
                width: "90px",
              }}
            />
          </Link>
          <ChinookBtn />
          {/* Game */}
          <GameIcon
            onClick={() => dispatch(gameActions.setGame("obstacleSpeedRacer"))}
          />
          <GamePlayBtn />
        </svg>
      </Box>
    </Layout>
  );
};

export default BattleRides;
