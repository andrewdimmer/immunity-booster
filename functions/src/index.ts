import * as functions from "firebase-functions";
import {
  completeFlutter,
  getFoodsFlutter,
  newDayFlutter,
  reorderFoodsFlutter,
  skipFlutter,
} from "./flutter/flutterHandlers";
import { alexaSkill } from "./Alexa/handlers";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const get_foods_flutter = getFoodsFlutter;
export const new_day_flutter = newDayFlutter;
export const complete_flutter = completeFlutter;
export const skip_flutter = skipFlutter;
export const reorder_foods_flutter = reorderFoodsFlutter;
export const alexa_handle_foods = alexaSkill;
