import { FC, useCallback, useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  AspectRatio,
  Spinner,
  SimpleGrid,
  Text,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { useCollection } from "react-firehooks";
import { db } from "@/connections/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import UnitButton from "@/components/Atoms/UnitButton";
import Layout from "@/components/Template/Layout";
import zone2 from "@/assets/images/ns55-showcase/zone-2/bg.png";
import zone2Mobile from "@/assets/images/ns55-showcase/zone-2/mobile-bg.png";
import rsaf from "@/assets/images/ns55-showcase/zone-2/rsaf.png";
import rsn from "@/assets/images/ns55-showcase/zone-2/rsn.png";
import saf from "@/assets/images/ns55-showcase/zone-2/saf.png";
import scdf from "@/assets/images/ns55-showcase/zone-2/scdf.png";
import spf from "@/assets/images/ns55-showcase/zone-2/spf.png";
// import placeholder from "@/assets/images/ns55-showcase/the-strength-within.png";
import BackButton from "@/components/Atoms/BackButton";
import { useNs55Zone2Disabled } from "@/hooks/ns55Showcase";

import type { StaticImageData } from "next/image";
import type { CollectionReference } from "firebase/firestore";
import { useOnClickTracking } from "@/hooks/trackings";

interface Unit {
  name: string;
  url: string;
  sequence: number;
}

const placeholderVideo =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/showcase-zone-2%2FMainshow%20Trailer.mp4?alt=media&token=58104142-4791-405e-a33d-55466b5bb177";

const logos: Record<string, StaticImageData> = {
  rsaf,
  rsn,
  saf,
  scdf,
  spf,
};

const unitsRef = collection(db, "showcase-zone-2") as CollectionReference<Unit>;
const q = query(unitsRef, orderBy("sequence"));

const Nss5Showcase: FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [isDesktop] = useMediaQuery("(min-width: 62em)");
  const [zone2Doc, zone2Loading] = useNs55Zone2Disabled();
  const [units, loading, error] = useCollection(q, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoName, setVideoName] = useState("");

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

  useEffect(() => {
    if (!zone2Loading && zone2Doc?.isDisabled) {
      router.back();
    }
  }, [router, zone2Doc?.isDisabled, zone2Loading]);

  const changeVideo = useCallback(
    (name: string) => {
      if (units) {
        const source = units.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .find((item) => item.name === name);
        if (source) {
          setVideoSrc(source.url);
          setVideoName(source.name);
          if (videoRef.current) {
            videoRef.current.play();
          }
        }
      }
    },
    [units]
  );

  const data = useMemo(() => {
    return units?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) || [];
  }, [units]);

  useOnClickTracking({
    isClicked: videoSrc !== "" && videoName !== "",
    type: "zones",
    data: {
      slug: "/ns55-showcase/zone-2",
      title: videoName,
    },
  });

  return (
    <Layout title="NS55 Showcase">
      <BackButton
        withLabel
        variant="cream"
        onClick={() => router.push("/ns55-showcase")}
        isFloating
      />
      <Box
        bgImage={{ base: zone2Mobile.src, md: zone2.src }}
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        d="flex"
        flexDir="column"
        alignItems="center"
        p="4rem 0 2rem"
        h="auto"
      >
        <AspectRatio w={{ base: "100%", md: "55%" }} ratio={16 / 9}>
          {videoSrc ? (
            <video
              autoPlay
              loop
              playsInline
              ref={videoRef}
              controls
              controlsList="nodownload"
              src={videoSrc}
            />
          ) : (
            <>
              {/* <Img
              src={placeholder.src}
              alt=""
              htmlWidth={placeholder.width}
              htmlHeight={placeholder.height}
            /> */}
              <video
                autoPlay
                loop
                playsInline
                ref={videoRef}
                controls
                controlsList="nodownload"
                src={placeholderVideo}
              />
            </>
          )}
        </AspectRatio>
        {loading && (
          <Box
            top="30%"
            left="50%"
            transform="translateX(-50%)"
            position="absolute"
          >
            <Spinner color="#FFF" size="xl" />
          </Box>
        )}
        <Box w={{ base: "full", lg: "70%" }}>
          <Text
            color="#676767"
            fontSize={{ base: "lg", lg: "3xl" }}
            fontWeight="bold"
            textAlign="center"
            my="8"
          >
            CHOOSE YOUR CALLING
          </Text>
          {isDesktop ? (
            <SimpleGrid columns={5} spacing={16}>
              {data.map((unit) => (
                <UnitButton
                  key={unit.id}
                  onClick={() => changeVideo(unit.id)}
                  image={logos[unit.id]}
                  name={unit.name}
                />
              ))}
            </SimpleGrid>
          ) : (
            <>
              <Flex mb={6} justifyContent="center">
                {data.slice(0, 2).map((unit) => (
                  <UnitButton
                    key={unit.id}
                    onClick={() => changeVideo(unit.id)}
                    image={logos[unit.id]}
                    name={unit.name}
                  />
                ))}
              </Flex>
              <Flex justifyContent="center">
                {data.slice(2).map((unit) => (
                  <UnitButton
                    key={unit.id}
                    onClick={() => changeVideo(unit.id)}
                    image={logos[unit.id]}
                    name={unit.name}
                  />
                ))}
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Nss5Showcase;
