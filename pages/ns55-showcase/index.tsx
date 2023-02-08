import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Image,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useNs55Zone2Disabled } from "@/hooks/ns55Showcase";

import Layout from "@/components/Template/Layout";
import showcase from "@/assets/images/ns55-showcase/showcase.jpg";
import showcaseMobile from "@/assets/images/ns55-showcase/showcase-mobile.jpg";
import BackButton from "@/components/Atoms/BackButton";
import { useOnClickTracking } from "@/hooks/trackings";

const btnStyle = { bgColor: "#B5242D !important", shadow: "none !important" };

const Nss5Showcase: FC = () => {
  const router = useRouter();
  const btnSize = useBreakpointValue({ base: "sm", md: "md" });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const [data, loading] = useNs55Zone2Disabled();

  useOnClickTracking({
    isClicked: true,
    type: "zones",
    data: {
      slug: "/ns55-showcase",
      title: "NS 55 Showcase",
    },
  });

  return (
    <Layout title="NS55 Showcase">
      <BackButton
        withLabel
        variant="cream"
        onClick={() => router.push("/")}
        isFloating
      />
      <Box position="relative" h="100%">
        <Image
          src={showcase.src}
          alt="Showcase"
          h="100%"
          fit="cover"
          objectPosition={`50% 30%`}
          w="100%"
          d={{ base: "none", md: "block" }}
        />
        <Image
          src={showcaseMobile.src}
          alt="Showcase"
          h="100%"
          fit="cover"
          objectPosition={`50% 50%`}
          w="100%"
          d={{ base: "block", md: "none" }}
        />
        <Stack
          bgColor="rgba(99, 102, 102, 0.5)"
          backdropFilter="blur(2px)"
          rounded="2xl"
          position="absolute"
          top={{ base: "unset", md: "50%" }}
          bottom={{ base: "60px", md: "unset" }}
          left={{ base: "50%", md: "60%" }}
          transform={{ base: "translateX(-50%)", md: "translateY(-50%)" }}
          p={{ base: "6", md: "10" }}
          spacing={{ base: "4", md: "6" }}
          w={{ base: "calc(100% - 30px)", md: "auto" }}
        >
          <Heading size={headingSize} textAlign="center">
            ZONE 1
          </Heading>
          <Link href="/ns55-showcase/zone-1" passHref>
            <Button
              size={btnSize}
              color="#FFF"
              sx={btnStyle}
              rounded="full"
              px="10"
            >
              NS THROUGH GENERATIONS
            </Button>
          </Link>
          <Heading size={headingSize} textAlign="center">
            ZONE 2
          </Heading>
          <Link href="/ns55-showcase/zone-2" passHref>
            <Button
              size={btnSize}
              color="#FFF"
              sx={btnStyle}
              rounded="full"
              px="10"
              disabled={data?.isDisabled ?? true}
              isLoading={loading}
            >
              {data?.isDisabled ?? true ? "COMING SOON" : "THE STRENGTH WITHIN"}
            </Button>
          </Link>
          <Heading size={headingSize} textAlign="center">
            ZONE 3
          </Heading>

          <Link href="/ns55-showcase/zone-3" passHref>
            <Button
              size={btnSize}
              color="#FFF"
              sx={btnStyle}
              rounded="full"
              px="10"
            >
              IN APPRECIATION
            </Button>
          </Link>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Nss5Showcase;
