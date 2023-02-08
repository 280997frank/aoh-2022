import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";

const AUDIO_ICON =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/capture-your-ns-moments%2Finstructions%2Faudio.svg?alt=media&token=3df56980-9005-4cf2-ac8a-7bc7d0aaa47b";
const PHOTO_ICON =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/capture-your-ns-moments%2Finstructions%2Fphoto.svg?alt=media&token=8a7e7599-1c4c-4062-b73e-29e5df45302c";
const TEXT_ICON =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/capture-your-ns-moments%2Finstructions%2Ftext.svg?alt=media&token=a63a3ce8-7c48-4cba-b051-051c02b00a7f";
const VIDEO_ICON =
  "https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/capture-your-ns-moments%2Finstructions%2Fvideo.svg?alt=media&token=e36b07dd-2195-4da4-b0db-d3f9ad02146b";

export interface ICaptureYourNSMomentsInstructionsProps {
  cards: [
    {
      subtitle: string;
      title: string;
    }
  ];
  title: string;
  subtitle: string;
}

interface ICaptureYourNSMomentsInstructions {
  data: ICaptureYourNSMomentsInstructionsProps;
}

const COLOR_LIST = [
  "brand.orange",
  "brand.green",
  "brand.lightGreen",
  "brand.cream",
  "brand.tallPoppy",
];

const ICON_LIST = [TEXT_ICON, PHOTO_ICON, AUDIO_ICON, VIDEO_ICON];

export default function Instructions({
  data,
}: ICaptureYourNSMomentsInstructions) {
  return (
    <Box textAlign="center">
      <Heading color="brand.green" mb="3rem">
        {data.title}
      </Heading>
      <Text color="brand.green" fontWeight="bold">
        {data.subtitle}
      </Text>
      <Flex w="100%" justifyContent="center" mt="1rem" flexWrap="wrap">
        {data.cards.map((item, index) => {
          return (
            <Flex
              p="1rem"
              py="1.5rem"
              mx="0.5rem"
              my="0.5rem"
              w="10rem"
              flexDir="column"
              borderRadius="lg"
              key={index}
              backgroundColor={COLOR_LIST[index]}
              justifyContent="flex-start"
              alignItems="center"
              color={index === 3 ? "brand.orange" : "white"}
            >
              <Image maxW="4rem" src={ICON_LIST[index]} alt="" />
              <Text fontWeight="bold" fontSize="lg" mt="1rem">
                {item.title}
              </Text>
              <Text>{item.subtitle}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
