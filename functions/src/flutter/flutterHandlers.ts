import * as functions from "firebase-functions";
import { getFoods, newDay } from "../Database/newDayAndGetData";
import { complete, skip } from "../Database/completeAndSkip";

export const getFoodsFlutter = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); // TODO: Make more secure later!
    getFoods()
      .then((list) => response.status(200).send({ list }))
      .catch((err) => {
        console.log(err);
        response.status(500).send("Unable to get foods.");
      });
  }
);

export const newDayFlutter = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*"); // TODO: Make more secure later!
  newDay()
    .then((list) => response.status(200).send({ list }))
    .catch((err) => {
      console.log(err);
      response.status(500).send("Unable to get foods.");
    });
});

export const completeFlutter = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); // TODO: Make more secure later!
    complete(request.body)
      .then((status) => response.status(200).send(status))
      .catch((err) => {
        console.log(err);
        response.status(500).send("Unable to reset day.");
      });
  }
);

export const skipFlutter = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*"); // TODO: Make more secure later!
  skip(request.body)
    .then((replacement) => response.status(200).send(replacement))
    .catch((err) => {
      console.log(err);
      response.status(500).send("Unable to reset day.");
    });
});
