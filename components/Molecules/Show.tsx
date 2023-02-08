import Button from "components/Atoms/Button";

import { FC, useEffect, useState } from "react";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import { Tag, TagLabel, Icon } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import React from "react";
import { useDispatch } from "react-redux";
import { actions as liveStreamActions } from "@/states/live-stream/slices";
import { actions as fullScreenActions } from "@/states/fullscreen/slice";
import ModalStream from "@/components/Molecules/ModalStream";
import dayjs from "dayjs";
import { useOnClickTracking } from "@/hooks/trackings";

interface IShowProps {
  shows: any;
}

const Shows: FC<IShowProps> = ({ shows = [{}] }) => {
  const dispatch = useDispatch();
  const [tracker, setTracker] = useState({
    slug: "",
    title: "",
    track: false,
  });

  useOnClickTracking({
    data: {
      slug: tracker.slug,
      title: tracker.title,
    },
    isClicked: tracker.track,
    type: "zones",
  });

  useEffect(() => {
    if (tracker.track) {
      setTracker({ slug: "", title: "", track: false });
    }
  }, [tracker.track]);

  const showLive = shows
    .filter(
      (list: { streamType: string; isLive: string; isDoneLive: boolean }) =>
        list.streamType === "livestream" && list.isLive && !list.isDoneLive
    )
    .sort((firstItem: any, secondItem: any) => {
      return firstItem.sequence < secondItem.sequence ? -1 : 1;
    });

  const showNotLive = shows
    .filter(
      (list: { streamType: string; isLive: string; isDoneLive: boolean }) =>
        (list.streamType === "livestream" && !list.isLive) || list.isDoneLive
    )
    .sort((firstItem: any, secondItem: any) => {
      return firstItem.sequence < secondItem.sequence ? -1 : 1;
    });

  const showVod = shows
    .filter((list: { streamType: string }) => list.streamType === "vod")
    .sort((firstItem: any, secondItem: any) => {
      return firstItem.sequence < secondItem.sequence ? -1 : 1;
    });

  const sortedShowList = showLive.concat(showNotLive, showVod);

  return (
    <Box pl={10} pr={10} mt={5} borderRadius="30px" bgColor="#FFFEE5">
      {sortedShowList?.map((item: any, index: number) => (
        <>
          <Box key={index}>
            <Flex flexDir="row" justify="space-between">
              <Text
                fontWeight="bold"
                color="#F65438"
                fontSize={{
                  base: "22px",
                  lg: "32px",
                }}
                mt={5}
                w="100%"
              >
                {item.title.toUpperCase()}
              </Text>
              <Box
                textAlign="right"
                w={{ base: "40%", lg: "20%" }}
                marginTop="25px"
              >
                {item.streamType === "livestream" &&
                item.isLive &&
                !item.isDoneLive ? (
                  <Tag bgColor="#F65438" textAlign="center" borderRadius="50px">
                    <Icon fontSize="20px" color="white" as={BsDot} />
                    <TagLabel
                      color="white"
                      fontWeight="bold"
                      paddingRight="10px"
                      paddingTop="3px"
                    >
                      LIVE
                    </TagLabel>
                  </Tag>
                ) : (
                  <> </>
                )}
              </Box>
            </Flex>
          </Box>
          <Text dangerouslySetInnerHTML={{ __html: item.description }} mt={3} />
          <br />
          <Flex fontSize={{ base: "16px", lg: "20px" }} flexDir="row">
            <Text fontWeight="bold" mr={2}>
              Date:
            </Text>
            <Text color="#2E4924">
              {dayjs.unix(item.date.seconds).format("DD MMMM YYYY").toString()}
            </Text>
          </Flex>
          <Box mb={2}>
            <Flex
              flexDir={{ base: "column", md: "row", lg: "row" }}
              justify="space-between"
            >
              <Box>
                <Flex flexDir="column">
                  <Flex flexDir="row" fontSize={{ base: "16px", lg: "20px" }}>
                    <Text fontWeight="bold" mr={2}>
                      Time:
                    </Text>
                    <Text color="#2E4924">
                      {dayjs.unix(item.date.seconds).format("h.mma").toString()}
                    </Text>
                  </Flex>
                  <Flex flexDir="row" fontSize={{ base: "16px", lg: "20px" }}>
                    <Text fontWeight="bold" mr={2}>
                      Location:
                    </Text>
                    <Text color="#2E4924">{item.location}</Text>
                  </Flex>
                </Flex>
              </Box>
              <Box
                mb={5}
                mt={{ base: "20px", lg: "0px" }}
                w={{ base: "100%", md: "50%", lg: "50%" }}
                textAlign="right"
              >
                <Button
                  bgColor={
                    item.streamType === "livestream" ? "#554C91" : "#FFFEE5"
                  }
                  padding="20px 80px"
                  color={item.streamType === "vod" ? "#554C91" : "white"}
                  type="submit"
                  form="login-form"
                  disabled={
                    (!item.isLive && item.streamType === "livestream") ||
                    item.isDoneLive
                  }
                  border="1px solid #554C91"
                  onClick={() => {
                    dispatch(
                      liveStreamActions.setStream({
                        isOpen: true,
                        streamUrl: item.streamUrl,
                        slidoUrl: item.slidoUrl,
                        streamType: item.streamType,
                      })
                    );
                    dispatch(fullScreenActions.setStream(true));
                    setTracker({
                      slug: "/shows",
                      title: item.title,
                      track: true,
                    });
                  }}
                >
                  {item.streamType === "livestream" ? "WATCH LIVE" : "WATCH"}
                </Button>
              </Box>
            </Flex>
          </Box>
          <Divider bgColor="black" />
          <ModalStream />
        </>
      ))}
    </Box>
  );
};

export default Shows;
