import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
} from "@chakra-ui/react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

// import Game from "@/components/Atoms/Game";

import { actions as gameActions } from "@/states/game/slice";

import type { FC } from "react";
import type { RootState } from "@/states/store";

const GameModal: FC = () => {
  const dispatch = useDispatch();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeReady, setIframeReady] = useState(false);
  const { gameName } = useSelector(
    (state: RootState) => ({
      gameName: state.game.name,
    }),
    shallowEqual
  );

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data === "gameClose") {
        dispatch(gameActions.setGame(""));
      }
    };

    window.addEventListener("message", messageListener, false);

    return () => {
      window.removeEventListener("message", messageListener, false);
    };
  }, [dispatch]);

  useEffect(() => {
    const iframeContent = iframeRef.current?.contentDocument?.body;

    if (gameName && isIframeReady && iframeContent) {
      iframeContent.style.backgroundColor = "transparent";
    }
  }, [gameName, isIframeReady]);

  return (
    <Modal
      isOpen={!!gameName}
      onClose={() => dispatch(gameActions.setGame(""))}
      size="full"
    >
      <ModalOverlay />
      <ModalContent m={0} p={0} w="auto" bgColor="transparent">
        <ModalBody
          p={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgColor={{ base: "transparent", lg: "white" }}
        >
          {gameName && (
            <AspectRatio
              ratio={9 / 16}
              w={{ base: "100vw", sm: "56.25vh" }}
              maxW="100vw"
              // maxH="-webkit-fill-available"
              css={css`
                max-height: 100vh;
                max-height: -webkit-fill-available;
              `}
              overflow="hidden"
            >
              <iframe
                src={`/games/${gameName}`}
                frameBorder="0"
                title="Game"
                ref={iframeRef}
                onLoad={() => setIframeReady(true)}
              ></iframe>
            </AspectRatio>
          )}
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default GameModal;
