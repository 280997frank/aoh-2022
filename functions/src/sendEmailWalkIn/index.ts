import * as functions from "firebase-functions";
import { walkIn } from "../function/walk-in";

const func = functions.https.onCall(walkIn);

export default func;
