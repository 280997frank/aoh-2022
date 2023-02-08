import * as crypto from "crypto";
import { privateKey } from "../constants";
import { ISubmiScoreLeaderBoardParam } from "../interfaces";

export const decryptText = (
  encryptedText: NodeJS.ArrayBufferView
): ISubmiScoreLeaderBoardParam => {
  return JSON.parse(
    crypto
      .privateDecrypt(
        privateKey,
        /* {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      }, */
        encryptedText
      )
      .toString()
  );
};
