export const LOGIN_ID = "aoh2022-login-id";
import { useEffect, useState } from "react";
// import crypto from "crypto";
import NodeRSA from "encrypt-rsa";
import { pubKey } from "@/constants/key";

interface THtmlVideo {
  src: string;
  type: string;
}
interface TVideoDetail {
  id: string;
  platform: string;
  htmlVideos: THtmlVideo[];
}

export const getAccessToken = (): string => {
  if ((process.env.NEXT_PUBLIC_COOKIE_NAME as string) !== "") {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string
      );
      return token !== null ? token : "";
    }
  }

  return "";
};
export const useVideo = (videoUrl: string): TVideoDetail => {
  const [video, setVideo] = useState<TVideoDetail>({
    id: "",
    platform: "",
    htmlVideos: [],
  });

  useEffect(() => {
    if (videoUrl !== null) {
      const videoDetail: TVideoDetail = {
        id: "",
        platform: "",
        htmlVideos: [],
      };

      const url = new URL(videoUrl);

      if (url.hostname.includes("vimeo")) {
        // const splitPathname = url.pathname.split('/')

        videoDetail.id = videoUrl; // splitPathname[1]
        videoDetail.platform = "vimeo";
      } else if (url.hostname.includes("youtube")) {
        const id = url !== null ? url.searchParams.get("v") : "";

        videoDetail.id = id !== null ? id : "";
        videoDetail.platform = "youtube";
      } else if (url.hostname.includes("dacast")) {
        const splitPathname = url.pathname.split("/");
        let id = splitPathname.slice(2).join("_");

        if (url.pathname.includes("/live/")) {
          id = splitPathname.slice(2).join("-live-");
        }

        videoDetail.id = id;
        videoDetail.platform = "dacast";
      } else {
        // use HTML's built-in video
        videoDetail.htmlVideos = [{ src: videoUrl, type: "video/mp4" }];
      }

      setVideo(videoDetail);
    }
  }, [videoUrl]);
  // console.log("video", video);
  return video;
};

export const getSessionId = (key: string): string => {
  const id = localStorage.getItem(LOGIN_ID);
  if (id === null || id === "") {
    localStorage.setItem(LOGIN_ID, key);
    return key;
  } else {
    return id;
  }
};

export async function encryptText(plainText: string) {
  /* return crypto.publicEncrypt(
    {
      key: pubKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer
    Buffer.from(plainText)
  ); */
  const nodeRSA = new NodeRSA();
  const encryptedText = nodeRSA.encryptStringWithRsaPublicKey({
    text: plainText,
    publicKey: pubKey,
  });

  return encryptedText;
}

// export const getSceneByPath = (path: string) => {
//   let scene = "";
//   switch (path) {
//     case "/our-army-formations":
//       scene = "scene_formation";
//       break;
//     case "/our-army-platforms":
//       scene = "scene_formation";
//       break;
//     case "/kids-zone":
//       scene = "scene_formation";
//       break;
//     case "/technology-zone":
//       scene = "scene_Technology";
//       break;
//     default:
//       scene = "Empty";
//       break;
//   }

//   return scene;
// };
