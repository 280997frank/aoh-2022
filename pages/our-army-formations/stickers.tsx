import React, { useEffect, useState } from "react";
import Layout from "@/components/Template/Layout";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
import TelegramIcon from "@/assets/icons/TelegramIcon";
import { useDocumentData } from "react-firehooks/firestore";
import { collection, doc, CollectionReference } from "firebase/firestore";
import { db } from "@/connections/firebase";
import { useOnClickTracking } from "@/hooks/trackings";

interface IStickerPage {
  telegram: string;
  whatsapp: string;
}

const StickerPage = () => {
  const req = collection(db, "stickers") as CollectionReference<IStickerPage>;
  const [isWhatsappDownloaded, setWhatsappDownloaded] = useState(false);
  const [isTelegramDownloaded, setTelegramDownloaded] = useState(false);
  const [data, loading] = useDocumentData(doc(req, "url"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  useOnClickTracking({
    data: {
      slug: "/our-army-formations/stickers",
      title: `Whatsapp Sticker Download`,
    },
    isClicked: isWhatsappDownloaded,
    type: "download",
  });

  useOnClickTracking({
    data: {
      slug: "/our-army-formations/stickers",
      title: `Telegram Sticker Download`,
    },
    isClicked: isTelegramDownloaded,
    type: "download",
  });

  return (
    <Layout title="Army Formation" withBackButton>
      <Box
        h="100%"
        w="100%"
        pos="relative"
        paddingX={{ base: "0", md: "50px", lg: "10rem" }}
        pt="50px"
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems={{ base: "center", md: "center" }}
          pb="10px"
        >
          <Text
            textAlign={{ base: "center", md: "left" }}
            fontWeight="bold"
            fontSize="1.5rem"
            lineHeight="1.625rem"
            textTransform="uppercase"
            color="brand.green"
            w="100%"
            mb="40px"
            display={{ md: "none" }}
          >
            Stickers Download
          </Text>
          <Box>
            <Skeleton isLoaded={!loading}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/dummy%2FdummyPhoneSticker.png?alt=media&token=de00a5c1-e168-4da7-99fd-90745b4b93dc"
                alt="image-one"
              />
            </Skeleton>
          </Box>
          <VStack px={{ base: "24px", md: "49px" }} mt={{ base: 10, md: 0 }}>
            <Text
              textAlign={{ base: "center", md: "left" }}
              fontWeight="bold"
              fontSize={{ base: "1.5rem", xl: "2.375rem" }}
              lineHeight="3.25rem"
              textTransform="uppercase"
              color="brand.green"
              w="100%"
              mb={{ base: "25px", md: "25px" }}
              display={{ base: "none", md: "block" }}
            >
              Stickers Download
            </Text>
            <Skeleton isLoaded={!loading}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/army-open-house-2022.appspot.com/o/dummy%2FdummySticker.png?alt=media&token=eac03b86-5802-4b6f-a7de-e83587193606"
                alt="image-one"
              />
            </Skeleton>
            <Divider
              display={{ md: "none" }}
              backgroundColor="#C0BE9A"
              h="1px"
              mt="30px !important"
              mb="8px !important"
            />
            <Flex
              flexDir={{ base: "column", md: "row" }}
              w={{ base: "90%", md: "100%" }}
              mt={{ md: "20px !important" }}
            >
              <HStack w="inherit">
                <WhatsAppIcon
                  w={{ base: "55px", xl: "65px" }}
                  h={{ base: "55px", xl: "65px" }}
                  color="white"
                />
                <Link
                  w="100%"
                  colorScheme="#007761"
                  color="#007761"
                  borderColor="#007761"
                  borderRadius="full"
                  borderWidth="2px"
                  alignSelf="center"
                  fontSize="0.6875rem"
                  fontWeight="bold"
                  textAlign="center"
                  textTransform="uppercase"
                  p="1%"
                  href={data?.whatsapp}
                  onClick={() => setWhatsappDownloaded(true)}
                  _hover={{ textDecor: "none" }}
                  isExternal
                >
                  <Text pt="1" lineHeight="25px">
                    DOWNLOAD NOW
                  </Text>
                </Link>
              </HStack>
              <HStack w="inherit">
                <TelegramIcon
                  w={{ base: "55px", xl: "65px" }}
                  h={{ base: "55px", xl: "65px" }}
                />
                <Link
                  w="100%"
                  colorScheme="#007761"
                  color="#007761"
                  borderColor="#007761"
                  borderRadius="full"
                  borderWidth="2px"
                  alignSelf="center"
                  fontSize="0.6875rem"
                  fontWeight="bold"
                  textAlign="center"
                  textTransform="uppercase"
                  p="1%"
                  href={data?.telegram}
                  onClick={() => setTelegramDownloaded(true)}
                  _hover={{ textDecor: "none" }}
                  isExternal
                >
                  <Text pt="1" lineHeight="25px">
                    DOWNLOAD NOW
                  </Text>
                </Link>
              </HStack>
            </Flex>
          </VStack>
        </Flex>
      </Box>
    </Layout>
  );
};

export default StickerPage;
