import Games from "@/components/Organisms/Games";
import Landing from "@/components/Organisms/Landing";
import Venue from "@/components/Organisms/Venue";
import Layout from "@/components/Template/Layout";
import ZoneButton from "@/components/Atoms/ZoneButton";
import { Box, IconButton, Image, useMediaQuery } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";

const LandingPage: FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);
  const executeScroll = () => homeRef.current?.scrollIntoView();
  const [isSamsungFald] = useMediaQuery("(min-width: 670px)");
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  useEffect(() => {
    const handleScroll = (e: any) => {
      if (e.srcElement.scrollTop > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);

    // Remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div>
      <Layout title="Home">
        <Box ref={homeRef} id="home" h="auto" position="relative">
          {isDesktop ? (
            <Box
              position="absolute"
              top="50%"
              w="80vw"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={20}
            >
              <Box width="100%" height="60vh" position="relative" color="#fff">
                <ZoneButton
                  color="#007FA4"
                  url="/technology-zone"
                  right={0}
                  top={40}
                  title="Technology Zone"
                />
                <ZoneButton
                  color="#D0B200"
                  url="/drone-arena"
                  right={10}
                  top={10}
                  title="Drone Arena"
                />
                <ZoneButton
                  color="#554C91"
                  url="/shows"
                  right={18}
                  bottom={10}
                  title="shows"
                />
                <ZoneButton
                  color="#D593C5"
                  right={33}
                  bottom={50}
                  title="kids zone"
                  url="/kids-zone"
                />
                <ZoneButton
                  color="#636666"
                  right={32}
                  top={20}
                  title="Experience the night"
                  url="/experience-the-night"
                />
                <ZoneButton
                  color="#747E2F"
                  left={40}
                  bottom={30}
                  title="Soldier Strong"
                  url="/soldier-strong"
                />
                <ZoneButton
                  color="#AB7D55"
                  left={30}
                  top={30}
                  title="Be A Marksman"
                  url="/be-a-marksman"
                />
                <ZoneButton
                  color="#7FA2D7"
                  left={30}
                  bottom={14}
                  title="Battle Rides"
                  url="/battle-rides"
                />
                <ZoneButton
                  color="#007761"
                  left={10}
                  top={30}
                  title="Our Army Formations"
                  url="/our-army-formations"
                />
                <ZoneButton
                  color="#B5242D"
                  left={5}
                  bottom={45}
                  title="NS55 Showcase"
                  url="/ns55-showcase"
                />
                <ZoneButton
                  color="#F08945"
                  left={0}
                  bottom={10}
                  title="Our Army Platforms"
                  url="/our-army-platforms"
                />
              </Box>
            </Box>
          ) : (
            <Box position="absolute" height="100vh" w="100vw" zIndex={20}>
              <Box width="100%" height="100%" position="relative" color="#fff">
                <ZoneButton
                  color="#007FA4"
                  url="/technology-zone"
                  right={isSamsungFald ? 20 : 10}
                  top={isSamsungFald ? 130 : 70}
                  title="Technology Zone"
                />
                <ZoneButton
                  color="#D0B200"
                  url="/drone-arena"
                  right={1}
                  top={isSamsungFald ? 120 : 65}
                  title="Drone Arena"
                />
                <ZoneButton
                  color="#554C91"
                  url="/shows"
                  left={isSamsungFald ? 27 : 25}
                  top={isSamsungFald ? 140 : 72}
                  title="shows"
                />
                <ZoneButton
                  color="#D593C5"
                  right={isSamsungFald ? 25 : 16}
                  top={isSamsungFald ? 82 : 45}
                  title="kids zone"
                  url="/kids-zone"
                />
                <ZoneButton
                  color="#636666"
                  right={isSamsungFald ? 15 : 7}
                  top={isSamsungFald ? 62 : 37}
                  title="Experience the night"
                  url="/experience-the-night"
                />
                <ZoneButton
                  color="#747E2F"
                  left={isSamsungFald ? 20 : 20}
                  top={isSamsungFald ? 90 : 45}
                  title="Soldier Strong"
                  url="/soldier-strong"
                />
                <ZoneButton
                  color="#AB7D55"
                  left={isSamsungFald ? 20 : 8}
                  top={isSamsungFald ? 74 : 34}
                  title="Be A Marksman"
                  url="/be-a-marksman"
                />
                <ZoneButton
                  color="#7FA2D7"
                  left={isSamsungFald ? 24 : 10}
                  top={isSamsungFald ? 105 : 55}
                  title="Battle Rides"
                  url="/battle-rides"
                />
                <ZoneButton
                  color="#007761"
                  left={isSamsungFald ? 32 : 50}
                  top={isSamsungFald ? 18 : 15}
                  title="Our Army Formations"
                  url="/our-army-formations"
                />
                <ZoneButton
                  color="#B5242D"
                  left={isSamsungFald ? 18 : 7}
                  top={isSamsungFald ? 45 : 23}
                  title="NS55 Showcase"
                  url="/ns55-showcase"
                />
                <ZoneButton
                  color="#F08945"
                  left={2}
                  top={34}
                  title="Our Army Platforms"
                  url="/our-army-platforms"
                />
              </Box>
            </Box>
          )}
          <Landing />
        </Box>
        <Box
          id="venue-info"
          h="100%"
          w={"100%"}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          position="relative"
          mb="35px"
        >
          {isDesktop && (
            <Box
              position="absolute"
              top="50%"
              w="100vw"
              transform="translate(0, -50%)"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2FClouds-02.png?alt=media&token=069cb73f-46e3-4736-8f14-94cbcacdcc45"
                alt="cloud"
              />
            </Box>
          )}
          <Venue />
        </Box>
        <Box
          id="virtual-games"
          h={{ base: "70%", md: "100%" }}
          w={"100%"}
          position="relative"
        >
          {isDesktop && (
            <Box
              position="absolute"
              top="0%"
              w="100vw"
              transform="translate(0, -0%)"
              zIndex={5}
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/landing-page%2FClouds-02.png?alt=media&token=069cb73f-46e3-4736-8f14-94cbcacdcc45"
                alt="cloud"
              />
            </Box>
          )}
          <Games />
        </Box>
        {showButton && (
          <IconButton
            zIndex={99}
            position="fixed"
            right={10}
            bottom={10}
            colorScheme={`brand.green`}
            background={`brand.green`}
            borderRadius="full"
            size="lg"
            aria-label="up button"
            onClick={() => executeScroll()}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 30 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.676526 14.5907C0.676526 14.192 0.825199 13.7933 1.1293 13.4892L14.0705 0.54803C14.361 0.257445 14.7598 0.0885003 15.172 0.0885003C15.5842 0.0885004 15.9829 0.250687 16.2735 0.541272L29.2282 13.4959C29.8364 14.1041 29.8364 15.0908 29.2282 15.699C28.62 16.3072 27.6333 16.3072 27.0251 15.699L15.172 3.84583L3.33234 15.6855C2.72414 16.2937 1.7375 16.2937 1.1293 15.6855C0.825198 15.3814 0.676526 14.9827 0.676526 14.584L0.676526 14.5907Z"
                  fill="white"
                />
              </svg>
            }
          />
        )}
      </Layout>
    </div>
  );
};

export default LandingPage;
