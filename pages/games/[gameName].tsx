import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import Game from "@/components/Atoms/Game";

import { auth } from "@/connections/firebase";

import { actions as userActions } from "@/states/user/slice";
import { useOnClickTracking } from "@/hooks/trackings";

const GamePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameName } = router.query;
  const [isReady, setReady] = useState(false);

  /* useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
  }, [router.query]); */

  useOnClickTracking({
    shouldWaitForOther: true,
    isReady: typeof gameName === "string",
    isClicked: isReady,
    type: "game",
    data: {
      slug: "/game",
      title: gameName as string,
    },
  });

  useEffect(() => {
    // Is in iframe
    if (window.frameElement) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          let firstName = "";
          let lastName = "";
          let email = "";

          if (user.email) {
            email = user.email;
          }

          if (user.displayName) {
            const splitName = user.displayName.split(" ");
            if (splitName.length === 1) {
              firstName = splitName[0];
            } else if (splitName.length > 1) {
              lastName = splitName.pop() || "";
              firstName = splitName.join(" ");
            }
          }

          dispatch(
            userActions.setProfile({
              id: user.uid,
              email,
              firstName,
              lastName,
            })
          );
        } else {
          dispatch(
            userActions.setProfile({
              id: "",
              email: "",
              firstName: "",
              lastName: "",
            })
          );
        }

        setReady(true);
      });

      return unsubscribe;
    }
  }, [dispatch]);

  return isReady ? (
    <Game name={typeof gameName === "string" ? gameName : ""} />
  ) : null;
};

export default GamePage;
