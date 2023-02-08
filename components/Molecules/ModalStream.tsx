import React, { FC } from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  chakra,
  AspectRatio,
  useMediaQuery,
} from "@chakra-ui/react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/states/store";
import { actions as liveStreamActions } from "@/states/live-stream/slices";
import { actions as fullScreenActions } from "@/states/fullscreen/slice";

const Iframe = chakra("iframe");

const ModalStream: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, streamUrl } = useSelector(
    (state: RootState) => ({
      isOpen: state.liveStream.isOpen,
      streamUrl: state.liveStream.streamUrl,
      slidoUrl: state.liveStream.slidoUrl,
      streamType: state.liveStream.streamType,
    }),
    shallowEqual
  );

  const getIframeStream = () => {
    return (
      <Iframe
        src={streamUrl}
        allow="autoplay; fullscreen"
        allowFullScreen
        w="full"
        h="full"
      />
    );
  };

  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(liveStreamActions.clear());
        dispatch(fullScreenActions.setStream(false));
      }}
      size="full"
      isCentered
    >
      <ModalOverlay bgColor="rgba(0, 0, 0, 0.4)" />
      <ModalContent
        bgColor="transparent"
        maxW={isDesktop ? "90vw" : "full"}
        // maxH={{ base: "100%", lg: "calc(100% - 7.5rem)" }}
        h="full"
        paddingTop={isDesktop ? "3.75rem" : "3.25rem"}
        // paddingBottom={isDesktop ? "1rem" : "2.25rem"}
      >
        <ModalCloseButton
          marginTop="0px"
          bgColor="#777777"
          borderRadius="full"
          color="white"
        />
        <ModalBody
          p={0}
          d="flex"
          justifyContent="center"
          flexDirection={isDesktop ? "row" : "column"}
        >
          {isDesktop ? (
            getIframeStream()
          ) : (
            <AspectRatio ratio={16 / 9} className="video-stream">
              {getIframeStream()}
            </AspectRatio>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalStream;
