import Script from "next/script";
import { useEffect, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { functions } from "@/connections/firebase";

import { actions as gameActions } from "@/states/game/slice";

import { encryptText } from "@/utils";

import type { RootState } from "@/states/store";
import type { FC } from "react";

interface ScorePayload {
  eventData: string;
  firstname: string;
  lastname: string;
  score: number;
  email: string;
}

interface SubmitScorePayload {
  data: string;
  // lastName: string;
  // gameName: string;
  // email: string;
  // score: number;
  recaptcha: string;
  // hash: string;
}

interface GetLeaderboardPayload {
  gameName: string;
  email: string;
}

const submitScoreLeaderBoard = httpsCallable<
  SubmitScorePayload,
  { message: string }
>(functions, "submitScoreLeaderBoard");

const getLeaderboard = httpsCallable<
  GetLeaderboardPayload,
  { data: unknown[] }
>(functions, "getLeaderboard");

interface GameProps {
  name?: string;
}

const Game: FC<GameProps> = ({ name: gameName }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isRecaptchaReady, setRecaptchaReady] = useState(false);
  const [isUnityReady, setUnityReady] = useState(false);
  const [gameInstance, setGameInstance] = useState<GameInstance>();
  const { userProfile /* gameName */ } = useSelector(
    (state: RootState) => ({
      userProfile: state.user,
      // gameName: state.game.name,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (window.UnityLoader) {
      setUnityReady(true);
    }
  }, []);

  useEffect(() => {
    if (isRecaptchaReady && gameInstance && gameName) {
      window.receiveMessageFromUnity = async (msg: string) => {
        try {
          const payload = JSON.parse(msg) as ScorePayload;
          switch (payload.eventData) {
            case "isLoaded":
              setTimeout(() => {
                gameInstance.SendMessage(
                  "[Bridge]",
                  "ReceiveMessageFromPage",
                  JSON.stringify({
                    eventData: "userProfile",
                    firstname: userProfile.firstName,
                    lastname: userProfile.lastName,
                    email: userProfile.email,
                  })
                );
              }, 1000);
              break;
            case "submitScore":
              window.grecaptcha.ready(function () {
                window.grecaptcha
                  .execute(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY, {
                    action: "submitScoreLeaderBoard",
                  })
                  .then(async (token: string) => {
                    let errorMessage = "";
                    try {
                      const payloads = {
                        firstName: payload.firstname,
                        lastName: payload.lastname,
                        gameName,
                        email: payload.email?.toLowerCase() || "",
                        score: payload.score,
                      };
                      await submitScoreLeaderBoard({
                        data: await encryptText(JSON.stringify(payloads)),
                        recaptcha: token,
                      });

                      /* toast({
                        title: "Score Submitted",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      }); */
                    } catch (error: any) {
                      errorMessage = error.message;
                      toast({
                        title: "Submit Score Error",
                        description: error.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    } finally {
                      gameInstance.SendMessage(
                        "[Bridge]",
                        "ReceiveMessageFromPage",
                        JSON.stringify({
                          eventData: "afterSubmit",
                          error: errorMessage,
                        })
                      );
                    }
                  })
                  .catch((error: Error) => {
                    gameInstance.SendMessage(
                      "[Bridge]",
                      "ReceiveMessageFromPage",
                      JSON.stringify({
                        eventData: "afterSubmit",
                        error: error.message,
                      })
                    );
                    toast({
                      title: "reCAPTCHA Error",
                      description: error.message,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  });
              });
              break;
            case "getLeaderboard":
              try {
                const { data } = await getLeaderboard({
                  gameName,
                  email: payload.email,
                });
                gameInstance.SendMessage(
                  "[Bridge]",
                  "ReceiveMessageFromPage",
                  JSON.stringify({
                    eventData: "leaderboardData",
                    data,
                  })
                );
              } catch (error) {
                toast({
                  title: "Leaderboard Error",
                  description: (error as Error).message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
              break;
            case "gameOver":
              // We might need to do something here later
              break;
            case "close":
              dispatch(gameActions.setGame(""));
              window.parent?.postMessage("gameClose", window.location.origin);
              break;
            default:
              throw new Error(
                `Invalid message from game: ${payload.eventData}`
              );
          }
        } catch (error: any) {
          toast({
            title: "Game Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      };
    }
  }, [
    gameInstance,
    dispatch,
    gameName,
    isRecaptchaReady,
    toast,
    userProfile.id,
    userProfile.email,
    userProfile.firstName,
    userProfile.lastName,
  ]);

  useEffect(() => {
    function onResizeFactory(gameInstance: GameInstance, scaleToFit: boolean) {
      return () => {
        const canvas = gameInstance.Module.canvas;
        const container = gameInstance.container;
        let w = 0;
        let h = 0;

        if (scaleToFit) {
          w = window.innerWidth;
          h = window.innerHeight;

          const r = 1920 / 1080;

          if (w * r > window.innerHeight) {
            w = Math.min(w, Math.ceil(h / r));
          }
          h = Math.floor(w * r);
        } else {
          w = 1080;
          h = 1920;
        }

        container.style.width = canvas.style.width = `inherit`;
        container.style.height = canvas.style.height = `${h}px`;
        container.style.top = `${Math.floor((window.innerHeight - h) / 2)}px`;
        container.style.left = `${Math.floor((window.innerWidth - w) / 2)}px`;
      };
    }

    if (isUnityReady && gameName) {
      const gameInstance_ = window.UnityLoader.instantiate(
        "gameContainer",
        `https://aoh-2022-games.netlify.app/${gameName}/build.json`
        // `/games/${gameName}/build.json`
      );

      let scaleToFit = false;

      try {
        scaleToFit = !!JSON.parse("true");
      } catch (e) {
        scaleToFit = true;
      }

      const onResize = onResizeFactory(gameInstance_, scaleToFit);

      onResize();

      window.addEventListener("resize", onResize, false);

      setGameInstance(gameInstance_);

      return () => {
        window.removeEventListener("resize", onResize, false);
        gameInstance_.Quit();
      };
    }
  }, [isUnityReady, gameName]);

  return (
    <>
      <Script async src="/UnityLoader.js" onLoad={() => setUnityReady(true)} />
      <Script
        async
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY}`}
        onLoad={() => setRecaptchaReady(true)}
      />
      <Box
        m="0 auto"
        width={{
          base:
            window.innerWidth > 650 && window.innerWidth < 690
              ? "50vw"
              : "100vw",
          lg: "30vw",
        }}
        h="-webkit-fill-available"
      >
        <Box
          id="gameContainer"
          data-pixelated="true"
          bg="transparent"
          w="full"
          sx={{
            position: "static !important",
          }}
        >
          <canvas></canvas>
        </Box>
      </Box>
    </>
  );
};

export default Game;
