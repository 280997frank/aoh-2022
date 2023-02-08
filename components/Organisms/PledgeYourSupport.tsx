import { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Center,
  Heading,
  Stack,
  Button,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { saveAs } from "file-saver";
import PledgeCard from "@/components/Atoms/PledgeCard";
import love from "@/assets/images/pledgeYourSupport/blue-love.png";
import thanks from "@/assets/images/pledgeYourSupport/orange-love.png";
import emojiLove from "@/assets/images/pledgeYourSupport/emoji-love.png";
import emojiThumb from "@/assets/images/pledgeYourSupport/emoji-thumb.png";
import emojiStrong from "@/assets/images/pledgeYourSupport/emoji-strong.png";
import { useOnClickTracking } from "@/hooks/trackings";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PledgeYourSupport: FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(3);
  const [template, setTemplate] = useState("blue");
  const [emoji, setEmoji] = useState("love");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [tracker, setTracker] = useState(false);

  const chooseTemplate = (template: string) => {
    setTemplate(template);
    setStep(2);
  };

  useEffect(() => {
    if (isOpen) {
      setTemplate("blue");
      setEmoji("love");
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (template === "blue") {
      setEmoji("love");
    } else {
      setEmoji("thumb");
    }
  }, [template]);

  useEffect(() => {
    if (step === 3) {
      const [firstTracker] = window.ga?.getAll() || [];
      if (firstTracker) {
        const trackerName = firstTracker.get("name");
        window.ga(`${trackerName}.send`, "event", "Zone3pledge", "Showcase");
      }
    }
  }, [step]);

  const downloadPledge = () => {
    setIsDownloaded(true);
    new Promise((resolve) => {
      resolve(
        saveAs(
          require(`@/assets/images/pledgeYourSupport/${template}-${emoji}.png`)
            .default.src,
          `your-pledge-${new Date().getTime()}.png`
        )
      );
    })
      .then(() => {
        setIsDownloaded(false);
      })
      .then(() => {
        const [firstTracker] = window.ga?.getAll() || [];
        if (firstTracker) {
          const trackerName = firstTracker.get("name");
          window.ga(
            `${trackerName}.send`,
            "event",
            "Zone3downloads",
            "Showcase"
          );
        }
      })
      .catch((error) => {
        error();
        setIsDownloaded(false);
        console.log({ error });
      });
  };

  useOnClickTracking({
    data: {
      slug: "/ns55-showcase/zone-3/pledgeYourSupport",
      title: `${template}-${emoji}.png`,
    },
    isClicked: isDownloaded,
    type: "pledge-your-support",
  });

  useOnClickTracking({
    data: {
      slug: "/ns55-showcase/zone-3/pledgeYourSupport",
      title: `Sticker Download`,
    },
    isClicked: tracker,
    type: "pledge-your-support",
  });

  return (
    <Modal isCentered size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        h={["auto", "22rem"]}
        minH="20rem"
        rounded="2xl"
        bgColor="rgba(29, 0, 90, 0.5)"
        color="#FFF"
        border="1px"
        borderColor="rgba(255, 255, 255, 0.25)"
        w={["90%", "100%"]}
        alignItems="center"
        justifyContent="center"
      >
        <ModalCloseButton
          right={["0", "-2rem"]}
          top="-2rem"
          rounded="full"
          sx={{
            bgColor: "#B5242D !important",
            shadow: "none !important",
          }}
        />
        <Center h="100%">
          {step === 1 && (
            <Stack direction="column" spacing="4" alignItems="center">
              <Heading as="h1" size="lg" textAlign="center" px="2rem">
                PLEDGE YOUR SUPPORT FOR NS
              </Heading>
              <Stack spacing="4">
                <Box
                  bgColor="whiteAlpha.600"
                  textAlign="center"
                  py="1"
                  rounded="full"
                  fontWeight="bold"
                >
                  CHOOSE YOUR DESIGN
                </Box>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing="2rem"
                >
                  <Image
                    w={["100px", "175px"]}
                    src={love.src}
                    alt="I Love NS"
                    onClick={() => chooseTemplate("blue")}
                    cursor="pointer"
                  />
                  <Text fontWeight="bold">OR</Text>
                  <Image
                    w={["90px", "155px"]}
                    src={thanks.src}
                    alt="Thanks for your service"
                    onClick={() => chooseTemplate("orange")}
                    cursor="pointer"
                  />
                </Stack>
              </Stack>
            </Stack>
          )}

          {step === 2 && (
            <Stack direction={["column", "row"]} spacing={["1", "3rem"]}>
              <PledgeCard
                template={template}
                emoji={emoji}
                alt="Pledge Card"
                w="300px"
              />
              <Stack justifyContent="center" spacing="8">
                <Stack bgColor="rgba(7, 0, 23, 0.6)" p="8" rounded="xl">
                  <Text textAlign="center" fontWeight="bold" fontSize="xl">
                    Select an Icon
                  </Text>
                  <Stack direction="row" alignItems="center" spacing="5">
                    <Image
                      cursor="pointer"
                      w="60px"
                      src={emojiLove.src}
                      alt="Emoji Love"
                      onClick={() => setEmoji("love")}
                    />
                    <Image
                      cursor="pointer"
                      w="60px"
                      src={emojiStrong.src}
                      alt="Emoji Strong"
                      onClick={() => setEmoji("strong")}
                    />
                    <Image
                      cursor="pointer"
                      w="60px"
                      src={emojiThumb.src}
                      alt="Emoji Thumb"
                      onClick={() => setEmoji("thumb")}
                    />
                  </Stack>
                </Stack>

                <Button
                  display={["none", "block"]}
                  size="sm"
                  rounded="full"
                  sx={{ bgColor: "#B5242D !important" }}
                  onClick={() => {
                    setStep(3);
                  }}
                  px="10"
                >
                  SUBMIT
                </Button>
              </Stack>
            </Stack>
          )}

          {step === 3 && (
            <Stack
              spacing="2.5rem"
              maxW="500px"
              alignItems="center"
              p={["10", "0"]}
            >
              <Heading as="h1" size="lg" textAlign="center">
                THANK YOU FOR PLEDGING YOUR SUPPORT TO NS
              </Heading>
              <Button
                size="sm"
                rounded="full"
                sx={{ bgColor: "#B5242D !important" }}
                px="10"
                onClick={downloadPledge}
              >
                DOWNLOAD YOUR PLEDGE
              </Button>
              <Button
                size="sm"
                rounded="full"
                sx={{ bgColor: "#CDA34E !important" }}
                px="10"
                onClick={() => {
                  setTracker(true);
                  window.open(
                    "https://getstickerpack.com/stickers/ns55-showcase",
                    "_blank"
                  );
                }}
              >
                DOWNLOAD STICKER PACK
              </Button>
            </Stack>
          )}
        </Center>
        {step === 2 && (
          <Button
            display={["block", "none"]}
            rounded="full"
            bottom="-4rem"
            sx={{ bgColor: "#B5242D !important" }}
            onClick={() => {
              setStep(3);
            }}
            px="14"
          >
            SUBMIT
          </Button>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PledgeYourSupport;
