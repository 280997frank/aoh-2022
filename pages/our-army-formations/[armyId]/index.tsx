import DetailEquipment from "@/components/Organisms/DetailEquipment";
import EquiptmentFormation from "@/components/Organisms/EquiptmentFormation";
import HistoryFormation from "@/components/Organisms/HistoryFormation";
import VideoFormation from "@/components/Organisms/VideoFormation";
import Layout from "@/components/Template/Layout";
import { db } from "@/connections/firebase";
import { ICardItem } from "@/types/cardItem";
import {
  Box,
  Center,
  Fade,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useRouter, withRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { useDocumentData } from "react-firehooks/firestore";
import { useOnClickTracking } from "@/hooks/trackings";

const DetailFormation = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<ICardItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const nodeRef: any = useRef(null);
  const url = window.location.pathname.split("/")[2];
  const req = collection(db, "army-formations");

  const [data] = useDocumentData(doc(req, url));
  const { isOpen, onToggle } = useDisclosure();

  const handleDetail = (item: ICardItem) => {
    setCurrentIndex(
      data?.equipments.findIndex((i: ICardItem) => i.title === item.title)
    );
    onToggle();
    scrollToTop();
  };

  const closeDetail = useCallback(() => {
    setDetail(null);
    isOpen && onToggle();
  }, [isOpen, onToggle]);

  const scrollToTop = useCallback(() => {
    const backButton = document.getElementById("top");
    backButton?.scrollIntoView();
  }, []);

  const handleEveryUrlEmpty = (videos: any) => {
    return videos.every((video: any) => video.url !== "");
  };

  useOnClickTracking({
    isClicked: data !== undefined,
    type: "hotspot",
    data:
      data !== undefined
        ? {
            slug: data.slug,
            title: data.title,
          }
        : {
            slug: "",
            title: "",
          },
  });

  return (
    <Layout
      title="Army Formations"
      withBackButton
      backButtonAction={isOpen ? () => closeDetail() : undefined}
    >
      <Box
        h="100%"
        w="100%"
        px={{ base: "0", md: "50px", lg: "20%" }}
        mt="0"
        id="top"
      >
        <Tabs
          colorScheme="green"
          onChange={() => {
            setPlaying(false);
            nodeRef !== null ?? nodeRef.current.pause();
          }}
        >
          <Center>
            <TabList
              borderBottom="none"
              ml="0"
              fontSize={{ base: "sm", md: "lg" }}
              zIndex="sticky"
            >
              <Tab
                borderBottom="none"
                color="#C0BE9A"
                _focus={{
                  outline: "none",
                  borderColor: "none",
                  borderBottom: "none",
                  color: "red",
                }}
                _active={{ borderBottom: "none" }}
                onClick={closeDetail}
              >
                <Text fontWeight="bold">INFORMATION</Text>
              </Tab>
              {data && data.videos && handleEveryUrlEmpty(data.videos) && (
                <Tab
                  borderBottom="none"
                  color="#C0BE9A"
                  _focus={{
                    outline: "none",
                    borderColor: "none",
                    borderBottom: "none",
                  }}
                  _active={{ borderBottom: "none" }}
                  onClick={closeDetail}
                >
                  <Text fontWeight="bold">VIDEO</Text>
                </Tab>
              )}
              {data && data.equipments && (
                <Tab
                  borderBottom="none"
                  color="#C0BE9A"
                  _focus={{
                    outline: "none",
                    borderColor: "none",
                    borderBottom: "none",
                  }}
                  _active={{ borderBottom: "none" }}
                >
                  <Text fontWeight="bold">EQUIPMENT</Text>
                </Tab>
              )}
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel>
              {data && (
                <HistoryFormation
                  headCard={{
                    title: data.title,
                    image: data.image,
                    subtitle: data.subtitle,
                  }}
                  description={data.history}
                />
              )}
            </TabPanel>
            {data && data.videos && handleEveryUrlEmpty(data.videos) && (
              <TabPanel>
                <VideoFormation
                  nodeRef={nodeRef}
                  headCard={{
                    title: data.title,
                    image: data.image,
                    subtitle: data.subtitle,
                  }}
                  videos={{
                    data: data.videos,
                    type: "video",
                  }}
                />
              </TabPanel>
            )}
            <TabPanel>
              {data && data.equipments && (
                <>
                  {!isOpen && (
                    <EquiptmentFormation
                      headCard={{
                        title: data.title,
                        image: data.image,
                        subtitle: data.subtitle,
                      }}
                      data={data.equipments}
                      onClick={(e: any) => handleDetail(e)}
                    />
                  )}
                  {isOpen && (
                    <Fade in={isOpen}>
                      <DetailEquipment
                        data={data.equipments}
                        index={currentIndex}
                        onChange={(index) => setCurrentIndex(index)}
                      />
                    </Fade>
                  )}
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box height="80px"></Box>
      </Box>
    </Layout>
  );
};

export default withRouter(DetailFormation);
